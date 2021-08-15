import { createBrowserHistory } from 'history';
import { ENV } from 'common/enums/enums';
import { Navigation } from './navigation/navigation.service';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { PodcastApi } from './podcast-api/podcast-api.service';
import { CommentApi } from './comment-api/comment-api.service';
import { Notification } from './notification/notification.service';
import { EpisodeApi } from './episode-api/episode-api.service';
import { Storage } from './storage/storage.service';
import { RecordAudio } from './record-audio/record-audio.service';
import { UserApi } from './user-api/user-api.service';
import { UserNotificationApi } from './user-notification-api/user-notification.service';
import { GenreApi } from './genre-api/genre-api.service';

const storage = new Storage({
  storage: localStorage,
});

const navigation = new Navigation({
  history: createBrowserHistory(),
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

const userApi = new UserApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const genreApi = new GenreApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const notification = new Notification();

const userNotificationApi = new UserNotificationApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const recordAudio = new RecordAudio({
  notificationService: notification,
});

export {
  authApi,
  notification,
  podcastApi,
  episodeApi,
  storage,
  navigation,
  commentApi,
  recordAudio,
  userApi,
  userNotificationApi,
  genreApi,
};
