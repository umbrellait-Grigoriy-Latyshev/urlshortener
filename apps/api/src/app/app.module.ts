import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: '****',
      password: '****',
      database: 'test',
      entities: [Url],
      synchronize: true, // remove in prod
    }),
    TypeOrmModule.forFeature([Url]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
