import { Module } from '@nestjs/common';
import Knex from 'knex';
import { UsersDatabaseService } from './users.database.service';

@Module({
  providers: [
    {
      provide: 'KNEX_CONNECTION',
      useFactory: async () => {
        return Knex({
          client: 'pg', // or 'mysql', 'sqlite3', etc.
          connection: {
            host: 'xx',
            user: 'xx',
            password: 'xx',
            database: 'xx',
            port: 5432,
          },
        });
      },
    },
    UsersDatabaseService,
  ],
  exports: ['KNEX_CONNECTION', UsersDatabaseService],
})
// DATABASE_URL="postgresql://postgres:Helloworld1234@localhost:5432/nest?schema=public"
export class DatabaseModule {}
