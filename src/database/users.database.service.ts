import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class UsersDatabaseService {
  constructor(@Inject('KNEX_CONNECTION') private databaseService: Knex) {}

  async testModule() {
    try {
      const result = await this.databaseService.raw('SELECT 1');
      if (result) {
        console.log('Database connection successful');
      }
      return;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw new Error('Database connection failed');
    }
  }

  async getAllUsers() {
    return this.databaseService('users').select('*');
  }

  async getUserById(id: number) {
    return this.databaseService('users').where('id', id).first();
  }

  async createUser(userData: { name: string; email: string }) {
    return this.databaseService('users').insert(userData);
  }

  async updateUser(id: number, userData: { name: string; email: string }) {
    return this.databaseService('users').where('id', id).update(userData);
  }

  async deleteUser(id: number) {
    return this.databaseService('users').where('id', id).del();
  }
}
