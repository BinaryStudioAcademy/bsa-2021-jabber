import { UserModel, PodcastModel, EpisodeModel, CommentModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { Podcast } from './podcast/podcast.repository';
import { Episode } from './episode/episode.repository';
import { Comment } from './comment/comment.repository';

const user = new User({
  UserModel,
});

const podcast = new Podcast({
  PodcastModel,
});

const episode = new Episode({
  EpisodeModel,
});

const comment = new Comment({
  CommentModel,
});

export {
  user,
  episode,
  podcast,
  comment,
};
