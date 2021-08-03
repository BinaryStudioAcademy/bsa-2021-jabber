import passportJwt from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { LogLevel, ENV } from '~/common/enums/enums';
import { AppAsyncStorage } from '~/common/types/types';
import {
  user as userRepository,
  podcast as podcastRepository,
  episode as episodeRepository,
  comment as commentRepository,
  record as recordRepository,
} from '~/data/repositories/repositories';
import { AsyncLocalStorage } from './async-storage/async-storage.service';
import { Logger } from './logger/logger.service';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Podcast } from './podcast/podcast.service';
import { Episode } from './episode/episode.service';
import { Comment } from './comment/comment.service';
import { Record } from './record/record.service';
import { FileStorage } from './file-storage/file-storage.service';
import { Token } from './token/token.service';
import { Passport } from './passport/passport.service';

const appAsyncStorage = new AsyncLocalStorage<AppAsyncStorage>();

const token = new Token({
  secret: <string>ENV.JWT.SECRET,
});

const logger = new Logger({
  logLevel: LogLevel.DEBUG,
  asyncStorage: appAsyncStorage,
});

const auth = new Auth({
  userRepository,
  tokenService: token,
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

const comment = new Comment({
  commentRepository,
});

const record = new Record({
  recordRepository,
});

const fileStorage = new FileStorage({
  storageApiUser: <string>ENV.UPLOAD.API_URL,
});

const passport = new Passport({
  secret: <string>ENV.JWT.SECRET,
  passportJwt,
  LocalStrategy,
  userRepository,
});

export {
  auth,
  appAsyncStorage,
  logger,
  user,
  episode,
  podcast,
  comment,
  record,
  fileStorage,
  token,
  passport,
};
