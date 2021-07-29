import { LogLevel } from '~/common/enums/enums';
import { AppAsyncStorage } from '~/common/types/types';
import { user as userRepository, podcast as podcastRepository } from '~/data/repositories/repositories';
import { AsyncLocalStorage } from './async-storage/async-storage.service';
import { Logger } from './logger/logger.service';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Podcast } from './podcast/podcast.service';
import { Episode } from './episode/episode.service';
import { episode as episodeRepository } from '~/data/repositories/repositories';

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

const podcast = new Podcast({
  podcastRepository,
});

const episode = new Episode({
  episodeRepository,
});

export {
  auth,
  appAsyncStorage,
  logger,
  user,
  episode,
  podcast,
};
