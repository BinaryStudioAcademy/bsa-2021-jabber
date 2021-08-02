import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { PodcastApi } from './podcast-api/podcast-api.service';
import { Notification } from './notification/notification.service';
import { EpisodeApi } from './episode-api/episode-api.service';

const http = new Http();

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

const notification = new Notification();

export { authApi, notification, podcastApi, episodeApi };
