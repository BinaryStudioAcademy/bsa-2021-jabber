import {
  UserModel,
  PodcastModel,
  EpisodeModel,
  CommentModel,
  RecordModel,
  ImageModel,
  ShownoteModel,
  GenreModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { Podcast } from './podcast/podcast.repository';
import { Image } from './image/image.repository';
import { Episode } from './episode/episode.repository';
import { Comment } from './comment/comment.repository';
import { Record } from './record/record.repository';
import { Shownote } from './shownote/shownote.repository';
import { Genre } from './genre/genre.repository';

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

const shownote = new Shownote({
  ShownoteModel,
});

const comment = new Comment({
  CommentModel,
});

const record = new Record({
  RecordModel,
});

const genre = new Genre({
  GenreModel,
})

export { user, episode, podcast, image, comment, record, shownote, genre };
