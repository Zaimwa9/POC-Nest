import { Injectable } from '@nestjs/common';
import { UsersDatabaseService } from '../database/users.database.service'; // Import UsersDatabaseService

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password: string;
  apiKey?: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly usersDatabaseService: UsersDatabaseService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      apiKey: 'sk_live_54321',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      apiKey: 'sk_live_12345',
    },
  ];

  async findOneWithPassword(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      await this.usersDatabaseService.testModule();
    } catch (e) {
      console.log(e);
    }
    return this.users.find(
      (user) => user.username === username && password === user.password,
    );
  }

  async findOneWithApiKey(apiKey: string): Promise<User | undefined> {
    return this.users.find((user) => user.apiKey === apiKey);
  }
}
