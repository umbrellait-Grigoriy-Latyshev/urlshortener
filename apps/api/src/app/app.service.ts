import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { Url } from '@evolving/api-interfaces';

import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>
  ) { }

  private sha256(str: string): string {
    const hash = createHmac('sha256', str)
      .update('I like Umbrella')
      .digest('hex');
    return hash;
  }

  private getRandomHash6(): string {
    return this.sha256(Date.now().toString()).substring(0, 6);
  }

  private async insertNewUrl(_hash: string, url: string): Promise<Url> {
    const newentry: Url = new Url(_hash, url);
    Logger.log(`Insert to db value ${JSON.stringify(newentry)}`);
    await this.urlRepository.insert(newentry);
    return newentry;
  }

  async getShortUrl(url: string, suggested?: string): Promise<string> {
    const _hash: string =
      suggested === undefined ? this.getRandomHash6() : suggested;
    // if row found -- return
    const row = await this.urlRepository.findOne({
      where: { shorturl: _hash },
    });
    if (row) return "";
    const newentry = await this.insertNewUrl(_hash, url);
    return newentry.shorturl;
  }

  async getFullUrl(url: string): Promise<string> {
    const row = await this.urlRepository.findOne({ where: { shorturl: url } });
    if (!row) {
      Logger.log(`Cannot find row for ${url} in db, return ''`);
      return '';
    }; // TODO: error propagation
    row.count++;
    Logger.log(`Increase count for row ${JSON.stringify(row)}, saving to db`);
    await this.urlRepository.save(row);
    return row.fullurl;
  }

  async isAvailable(shorturl: string): Promise<boolean> {
    const row = await this.urlRepository.findOne({
      where: { shorturl: shorturl },
    });
    return row === undefined;
  }

}
