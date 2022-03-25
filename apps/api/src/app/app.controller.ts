import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  CreateShortURLMessage,
  StatusMessage,
  URLMessage,
} from '@evolving/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('short')
  async getShortUrl(
    @Body() params: CreateShortURLMessage
  ): Promise<URLMessage> {
    let url = await this.appService.getShortUrl(params.url, params.suggested);
    return { url: url, success: true };
  }

  @Get('long/:url')
  async getLongUrl(@Param() params): Promise<URLMessage> {
    let url = await this.appService.getFullUrl(params.url);
    if (url.length === 0) return { url: '', success: false };
    return { url: url, success: true };
  }

  @Get('/available/:url')
  async getShortUrlAvailability(@Param() params): Promise<StatusMessage> {
    let available = await this.appService.isAvailable(params.url);
    return { success: available };
  }
}
