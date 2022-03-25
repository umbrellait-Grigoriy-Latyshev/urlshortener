import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Message } from '@evolving/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('short')
  async getShortUrl(@Body() params: Message): Promise<Message> {
    let url = await this.appService.getShortUrl(params.url);
    return { url: url, success: true };
  }

  @Get('long/:url')
  async getLongUrl(@Param() params): Promise<Message> {
    let url = await this.appService.getFullUrl(params.url);
    if (url.length === 0) return { url: '', success: false };
    return { url: url, success: true };
  }
}
