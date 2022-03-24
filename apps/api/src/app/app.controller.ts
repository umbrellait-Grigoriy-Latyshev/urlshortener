import { Controller, Get, Param } from '@nestjs/common';

import { Message } from '@evolving/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('short/:url')
  getShortUrl(@Param() params): Message {
    return { url: params.url };
  }

  @Get('long/:url')
  getLongUrl(@Param() params): Message {
    return { url: params.url };
  }
}
