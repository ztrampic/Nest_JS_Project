import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {asyncTypeOrmConfig} from "../db_config";
import {CoreModule} from './core/core.module';
import 'reflect-metadata';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./core/auth/guards/jwt.auth.guard";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(
            asyncTypeOrmConfig
        ),
        CoreModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {provide: APP_GUARD, useClass: JwtAuthGuard},
    ],
})
export class AppModule {
}
