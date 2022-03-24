import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Message } from '@evolving/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('short')
  getShortUrl(@Body() params: Message): Message {
    return { url: params.url };
  }

  @Get('long/:url')
  getLongUrl(@Param() params): Message {
    return { url: params.url };
  }
}
