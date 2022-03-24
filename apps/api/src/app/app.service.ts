import { Injectable } from '@nestjs/common';
import { Message } from '@evolving/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { url: 'Welcome to api!' };
  }
}
