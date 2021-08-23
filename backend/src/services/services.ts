import passportJwt from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { LogLevel, ENV } from '~/common/enums/enums';
import { AppAsyncStorage } from '~/common/types/types';
import {
  user as userRepository,
  podcast as podcastRepository,
  episode as episodeRepository,
  shownote as shownoteRepository,
  comment as commentRepository,
  record as recordRepository,
  image as imageRepository,
  genre as genreRepository,
  podcastFollower as podcastFollowerRepository,
} from '~/data/repositories/repositories';
import { AsyncLocalStorage } from './async-storage/async-storage.service';
import { Logger } from './logger/logger.service';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Podcast } from './podcast/podcast.service';
import { Episode } from './episode/episode.service';
import { Shownote } from './shownote/shownote.service';
import { Comment } from './comment/comment.service';
import { Record } from './record/record.service';
import { FileStorage } from './file-storage/file-storage.service';
import { Token } from './token/token.service';
import { Passport } from './passport/passport.service';
import { Image } from './image/image.service';
import { Genre } from './genre/genre.service';
import { Socket } from './socket/socket.service';
import { PodcastFollower } from './podcast-follower/podcast-follower.service';

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

const fileStorage = new FileStorage({
  storageApiUser: <string>ENV.UPLOAD.API_URL,
});

const user = new User({
  userRepository,
  tokenService: token,
  imageRepository,
  fileStorage,
});

const shownote = new Shownote({
  shownoteRepository,
});

const comment = new Comment({
  commentRepository,
});

const record = new Record({
  recordRepository,
});

const image = new Image({
  imageRepository,
  fileStorage,
});

const episode = new Episode({
  episodeRepository,
  shownoteService: shownote,
  commentService: comment,
  recordService: record,
  imageService: image,
  imageRepository,
  recordRepository,
  fileStorage,
});

const podcast = new Podcast({
  podcastRepository,
  imageRepository,
  fileStorage,
  imageService: image,
  episodeService: episode,
});

const passport = new Passport({
  secret: <string>ENV.JWT.SECRET,
  passportJwt,
  LocalStrategy,
  userRepository,
});

const genre = new Genre({
  genreRepository,
});

const podcastFollower = new PodcastFollower({
  podcastFollowerRepository,
});

const socket = new Socket();

export {
  auth,
  appAsyncStorage,
  logger,
  user,
  episode,
  shownote,
  podcast,
  comment,
  record,
  fileStorage,
  token,
  passport,
  image,
  genre,
  socket,
  podcastFollower,
};
