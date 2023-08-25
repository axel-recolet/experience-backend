import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { LDAPAuthGuard } from './guards/ldap-auth.guard';
import { User } from 'src/users/user.decorator';

import { LoginDto } from './dto/login.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { ILDAPUser } from '../ldap/interfaces';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @UseGuards(LDAPAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: LoginDto })
  @HttpCode(200)
  async login(@User() user: ILDAPUser): Promise<LoginDto> {
    try {
      return this._authService.login(user);
    } catch (error) {
      throw error;
    }
  }
}
