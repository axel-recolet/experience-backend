import { Injectable } from '@nestjs/common';

@Injectable()
export class usersService {
  constructor(private readonly _usersRepo: UsersRepository) {}

  /**
   * Create a new user in the MidgardDB
   */
  async create(uid: string): Promise<IUser> {
    try {
      return this._usersRepo.create(uid);
    } catch (error) {
      throw error;
    }
  }

  // Read
  async getUserCoreById(id: string): Promise<IUser | undefined> {
    try {
      return this._usersRepo.getUserCoreById(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    try {
      return this._usersRepo.getUserById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return this._usersRepo.getAll();
    } catch (error) {
      throw error;
    }
  }
}
