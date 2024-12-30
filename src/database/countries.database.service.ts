import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class CountriesDatabaseService {
  constructor(@Inject('KNEX_CONNECTION') private databaseService: Knex) {}

  private readonly countries = [
    { id: 1, name: 'United States', iso2: 'US' },
    { id: 2, name: 'Canada', iso2: 'CA' },
    { id: 3, name: 'Mexico', iso2: 'MX' },
  ];

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

  async getAllCountries() {
    try {
      const dbCountries = await this.databaseService('countries').select('*');
      return dbCountries;
    } catch (e) {
      console.error('Error fetching countries from database:', e);
      return this.countries;
    }
  }
}
