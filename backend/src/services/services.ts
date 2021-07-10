import { LogLevel } from '~/common/enums/enums';
import { AppAsyncStorage } from '~/common/types/types';
import { AsyncLocalStorage } from './async-storage/async-storage.service';
import { Logger } from './logger/logger.service';

const appAsyncStorage = new AsyncLocalStorage<AppAsyncStorage>();

const logger = new Logger({
  logLevel: LogLevel.DEBUG,
  asyncStorage: appAsyncStorage,
});

export { appAsyncStorage, logger };
