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

  private sha256(str: string): string {
    const hash = createHmac('sha256', str)
      .update('I like Umbrella')
      .digest('hex');
    return hash;
  }

  private getRandomHash(maxlen: number): string {
    maxlen = maxlen < 0 ? -maxlen : maxlen;
    maxlen = maxlen < 3 ? 3 : maxlen;
    return this.sha256(Date.now().toString()).substring(0, maxlen);
  }

  async getShortUrl(url: string, suggested?: string): Promise<string> {
    let row: Url;
    let _hash: string =
      suggested === undefined ? this.getRandomHash(6) : suggested;
    let _hash2: string = _hash;
    do {
      _hash = _hash2;
      row = await this.urlRepository.findOne({
        where: { shorturl: _hash },
      });
      _hash2 = this.getRandomHash(6);
    } while (row);
    const newentry: Url = new Url(_hash, url);
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
