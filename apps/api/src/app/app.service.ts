import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { Repository } from 'typeorm';
import { Url } from './url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>
  ) {}

  private calculateShortUrl(str: string): string {
    const hash = createHmac('sha256', str)
      .update('I love cupcakes')
      .digest('hex');
    return hash;
  }

  async getShortUrl(url: string, suggested?: string): Promise<string> {
    // check suggested url
    let row = await this.urlRepository.findOne({
      where: { shorturl: suggested },
    });
    if (row) return row.shorturl;
    // check calculated url
    const calcShortUrl = this.calculateShortUrl(url);
    row = await this.urlRepository.findOne({
      where: { shorturl: calcShortUrl },
    });
    if (row) return row.shorturl;
    // if not found -- create and return new
    const shorturl = suggested ? suggested : calcShortUrl;
    const newentry: Url = new Url(shorturl, url);
    await this.urlRepository.insert(newentry);
    return newentry.shorturl;
  }

  async getFullUrl(url: string): Promise<string> {
    let row = await this.urlRepository.findOne({ where: { shorturl: url } });
    if (!row) return ''; // TODO: error propagation
    row.count++;
    await this.urlRepository.save(row);
    return row.fullurl;
  }

  async isValid(shorturl: string): Promise<boolean> {
    let row = await this.urlRepository.findOne({
      where: { shorturl: shorturl },
    });
    return row !== undefined;
  }

  async isAvailable(shorturl: string): Promise<boolean> {
    return !(await this.isValid(shorturl));
  }
}
