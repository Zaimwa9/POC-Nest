import { Module } from '@nestjs/common';
import Knex from 'knex';
import { CountriesDatabaseService } from './countries.database.service';

@Module({
  providers: [
    {
      provide: 'KNEX_CONNECTION',
      useFactory: async () => {
        return Knex({
          client: 'pg',
          connection: {
            host: 'localhost',
            user: 'xx',
            password: 'xx',
            database: 'xx',
            port: 5432,
          },
        });
      },
    },
    CountriesDatabaseService,
  ],
  exports: ['KNEX_CONNECTION', CountriesDatabaseService],
})
export class DatabaseModule {}
