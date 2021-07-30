import { UserModel, PodcastModel, EpisodeModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { Podcast } from './podcast/podcast.repository';
import { Episode } from './episode/episode.repository';

const user = new User({
  UserModel,
});

const podcast = new Podcast({
  PodcastModel,
});

const episode = new Episode({
  EpisodeModel,
});

export {
  user,
  episode,
  podcast,
};
