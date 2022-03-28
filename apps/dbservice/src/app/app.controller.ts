import { Controller } from '@nestjs/common';

import { AppService } from './app.service';

import { Console, ConsoleService } from 'nestjs-console';

@Controller()
@Console()
export class AppController {
  constructor(private appService: AppService,
    private consoleService: ConsoleService) {

    const cli = this.consoleService.getCli();
    this.consoleService.createCommand(
      {
        command: 'clean <days>',
        description: 'remove all rows older than <days>'
      },
      {
        instance: this.appService,
        methodName: "clean"
      },
      // this.appService.clean,
      cli // attach the command to the cli
    );
  }

}
