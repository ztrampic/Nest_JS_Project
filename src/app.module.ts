import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {asyncTypeOrmConfig} from "../db_config";
import { CoreModule } from './core/core.module';
import 'reflect-metadata';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync(
        asyncTypeOrmConfig
      ),
      CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
