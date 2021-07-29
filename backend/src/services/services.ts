import { LogLevel } from '~/common/enums/enums';
import { AppAsyncStorage } from '~/common/types/types';
import { user as userRepository } from '~/data/repositories/repositories';
import { AsyncLocalStorage } from './async-storage/async-storage.service';
import { Logger } from './logger/logger.service';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';

const appAsyncStorage = new AsyncLocalStorage<AppAsyncStorage>();

const logger = new Logger({
  logLevel: LogLevel.DEBUG,
  asyncStorage: appAsyncStorage,
});

const auth = new Auth({
  userRepository,
});

const user = new User({
  userRepository,
});

export { auth, appAsyncStorage, logger, user };
