import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { PodcastApi } from './podcast-api/podcast-api.service';
import { CommentApi } from './comment-api/comment-api.service';
import { Notification } from './notification/notification.service';
import { EpisodeApi } from './episode-api/episode-api.service';
import { Storage } from './storage/storage.service';
import { RecordAudio } from './record-audio/record-audio.service';

const storage = new Storage({
  storage: localStorage,
});

const http = new Http({
  storage,
});

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const podcastApi = new PodcastApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const episodeApi = new EpisodeApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const commentApi = new CommentApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const notification = new Notification();

const recordAudio = new RecordAudio({
  notificationService: notification,
});

export {
  authApi,
  notification,
  podcastApi,
  episodeApi,
  storage,
  commentApi,
  recordAudio,
};
