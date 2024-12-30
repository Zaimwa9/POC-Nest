import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CountriesDatabaseService } from './database/countries.database.service';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, CountriesDatabaseService, AuthGuard],
})
export class AppModule {}
