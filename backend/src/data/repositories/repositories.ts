import { UserModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { Episode } from './episode/episode.repository';
import { EpisodeModel } from '~/data/models/models';

const user = new User({
  UserModel,
});

const episode = new Episode({
  EpisodeModel
})

export {
  user,
  episode
};
