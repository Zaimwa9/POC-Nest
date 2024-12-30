import { Injectable } from '@nestjs/common';
import { CountriesDatabaseService } from './database/countries.database.service';

@Injectable()
export class AppService {
  constructor(
    private readonly countriesDatabaseService: CountriesDatabaseService,
  ) {}

  async getCountries() {
    return this.countriesDatabaseService.getAllCountries();
  }
}
