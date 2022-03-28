import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from '@evolving/api-interfaces';

@Module({
  imports: [ConsoleModule,
    ConfigModule.forRoot({
      envFilePath: '../../../.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: parseInt(process.env.DBPORT),
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      entities: [Url],
    }),
    TypeOrmModule.forFeature([Url]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
