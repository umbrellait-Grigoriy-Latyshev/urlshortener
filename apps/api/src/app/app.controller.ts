import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  CreateShortURLMessage,
  StatusMessage,
  URLMessage,
} from '@evolving/api-interfaces';


import { ApiOperation } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('short')
  @ApiOperation({ summary: 'Create short url by full link' })
  async getShortUrl(
    @Body() params: CreateShortURLMessage
  ): Promise<URLMessage> {
    Logger.log(`Requested /short api:\n  ${JSON.stringify(params)}`);
    const url = await this.appService.getShortUrl(params.url, params.suggested)
    return { url: url, success: url.length !== 0 };
  }


  @Get('long/:hash')
  @ApiOperation({ summary: 'Get full url by short hash' })
  async getLongUrl(@Param() params): Promise<URLMessage> {
    Logger.log(`Requested /long/${params.hash}`);
    const url = await this.appService.getFullUrl(params.hash);
    if (url.length === 0) return { url: '', success: false };
    return { url: url, success: true };
  }


  @Get('/available/:hash')
  @ApiOperation({ summary: 'Checks that short url available' })
  async getShortUrlAvailability(@Param() params): Promise<StatusMessage> {
    Logger.log(`Requested /available/${params.hash}`);
    const available = await this.appService.isAvailable(params.hash);
    Logger.log(`return ${available}`);
    return { success: available };
  }
}
