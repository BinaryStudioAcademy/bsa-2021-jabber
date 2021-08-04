import {
  UserModel,
  PodcastModel,
  EpisodeModel,
  CommentModel,
  RecordModel,
  ImageModel,
  ShowNotesModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { Podcast } from './podcast/podcast.repository';
import { Image } from './image/image.repository';
import { Episode } from './episode/episode.repository';
import { Comment } from './comment/comment.repository';
import { Record } from './record/record.repository';
import { ShowNotes } from './show-notes/show-notes.repository';

const user = new User({
  UserModel,
});

const podcast = new Podcast({
  PodcastModel,
});

const image = new Image({
  ImageModel,
});

const episode = new Episode({
  EpisodeModel,
});

const showNotes = new ShowNotes({
  ShowNotesModel,
});

const comment = new Comment({
  CommentModel,
});

const record = new Record({
  RecordModel,
});

export { user, episode, podcast, image, comment, record, showNotes };
