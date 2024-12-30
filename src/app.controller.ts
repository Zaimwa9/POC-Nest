import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Countries } from './common/types/countries.types';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard)
  @Get('countries')
  async getCountries(): Promise<Countries[]> {
    return this.appService.getCountries();
  }
}
