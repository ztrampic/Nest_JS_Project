import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DB_CONFIG} from "../db_config";
import { CoreModule } from './core/core.module';
import 'reflect-metadata';

@Module({
  imports: [
      TypeOrmModule.forRoot(
        DB_CONFIG
      ),
      CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
