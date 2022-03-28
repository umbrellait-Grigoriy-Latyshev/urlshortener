/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { BootstrapConsole } from 'nestjs-console';

import { AppModule } from './app/app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true
});
bootstrap.init().then(async (app) => {
  try {
      await app.init();
      Logger.log("App initialized");

      await bootstrap.boot();
      Logger.log("App booted");

      await app.close();
      Logger.log("App closed");

  } catch (e) {
      console.error(e);
      await app.close();
      process.exit(1);
  }
});