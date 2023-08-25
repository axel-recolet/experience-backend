import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

import { AbilityService } from 'src/ability/ability.service';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';
import { UsersService } from 'src/users/users.service';

import { JwtStrategy } from './strategies';

import { LoginDto } from './dto/login.dto';
import { IJWTPayload } from './interfaces';
import { ILDAPUser } from 'src/ldap/interfaces';
import { IUser } from 'src/users/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,
    private readonly _configService: ConfigService,
    private readonly _abilityService: AbilityService,
    private readonly _logger: CustomLoggerService,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
    private readonly _jwtStrategy: JwtStrategy,
  ) {}

  async login(ldapUser: ILDAPUser): Promise<LoginDto> {
    try {
      const { uid, ...ldapUserRest } = ldapUser;

      // receive or create a new user in MidgardDB
      const localUser = await (async () => {
        // search user in MidgardDB and update lastLogin
        const isUpdated = await this._usersService.update({ uid, lastLogin: new Date() });
        // if user exists, it is returned
        if (isUpdated !== null) {
          const user = await this._usersService.getUserCoreByUid(uid);
          if (user) return user;
          else {
            const error = new Error('User updated but it did not find.');
            this._logger.error(error);
            throw error;
          }
        }
        // else create new user
        return await this._usersService.create(uid);
      })();

      const user: IUser = {
        ...localUser,
        ...ldapUser,
      };

      const { _id } = user;

      // Set Cache
      await this._cacheManager.set(`User.${_id}`, user);

      const jwtPayload: IJWTPayload = {
        _id: _id.toString(),
        uid,
      };

      const access_token = await this._jwtService.signAsync(jwtPayload);
      const expires = (() => {
        const content = this._jwtService.decode(access_token);
        if (!content || typeof content === 'string') {
          throw new Error("access_token doesn't content expires.");
        }
        return content.exp * 1000;
      })();

      return {
        access_token,
        expires,
        _id,
        ...ldapUserRest,
        ability: {
          rules: this._abilityService.createForUser(user).rules,
          detectSubjectType: this._abilityService.detectSubjectType.toString(),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async validate(payload: any): Promise<IUser> {
    const { _id, uid } = payload;
    if (!_id || !uid) throw new UnauthorizedException();

    const user = await this._userService.getUserById(_id);
    if (!user) throw new UnauthorizedException();

    return user;
  }

  async verify(token: string): Promise<IUser> {
    const payload = this._jwtService.verify(token, this._configService.getOrThrow('jwt'));
    return this._jwtStrategy.validate(payload);
  }
}
