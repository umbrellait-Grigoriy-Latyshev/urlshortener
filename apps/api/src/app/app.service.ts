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

  getShortUrl(url: string): Promise<string> {
    return this.urlRepository.findOne(url).then((pair) => {
      if (pair !== undefined) {
        return pair.shorturl;
      }
      const newentry: Url = {
        shorturl: this.calculateShortUrl(url),
        fullurl: url,
      };
      this.urlRepository.insert(newentry);
      // TODO: check that transaction succeed
      return newentry.shorturl;
    });
  }

  getFullUrl(url: string): Promise<string> {
    return this.urlRepository.findOne(url).then((pair) => pair.fullurl);
  }

  isValid(shorturl: string): Promise<boolean> {
    return this.urlRepository.findOne(shorturl).then((e) => {
      return e === undefined;
    });
  }

  isAvailable(shorturl: string): Promise<boolean> {
    return this.isValid(shorturl).then((e) => !e);
  }
}
