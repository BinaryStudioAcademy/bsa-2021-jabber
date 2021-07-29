import { UserModel, PodcastModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { Podcast } from './podcast/podcast.repository';

const user = new User({
  UserModel,
});

const podcast = new Podcast({
  PodcastModel,
});

export { user, podcast };
