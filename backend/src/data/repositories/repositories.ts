import { UserModel, PodcastModel, EpisodeModel, CommentModel, RecordModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { Podcast } from './podcast/podcast.repository';
import { Episode } from './episode/episode.repository';
import { Comment } from './comment/comment.repository';
import { Record } from './record/record.repository';

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

const record = new Record({
  RecordModel,
});

export {
  user,
  episode,
  podcast,
  comment,
  record,
};
