import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesDatabaseService } from './database/countries.database.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule, DatabaseModule],
      controllers: [AppController],
      providers: [AppService, CountriesDatabaseService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Country list', async () => {
      expect(await appController.getCountries()).toEqual([
        { id: 1, name: 'United States', iso2: 'US' },
        { id: 2, name: 'Canada', iso2: 'CA' },
        { id: 3, name: 'Mexico', iso2: 'MX' },
      ]);
    });
  });
});
