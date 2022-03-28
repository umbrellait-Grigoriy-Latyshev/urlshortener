import { Controller } from '@nestjs/common';

import { AppService } from './app.service';

import {Console, ConsoleService} from 'nestjs-console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from '@evolving/api-interfaces';

@Controller()
@Console()
export class AppController {
  constructor(private appService: AppService,
    private consoleService: ConsoleService,
    @InjectRepository(Url)
    private urlRepository: Repository<Url>) {
      
      const cli = this.consoleService.getCli();
      this.consoleService.createCommand(
        {
            command: 'clean <days>',
            description: 'remove all rows older than <days>'
        },
        this.appService.clean(this.urlRepository),
        cli // attach the command to the cli
    );
    }

}
