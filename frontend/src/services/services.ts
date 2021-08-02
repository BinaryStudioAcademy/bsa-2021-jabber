import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { PodcastApi } from './podcast-api/podcast-api.service';
import { Notification } from './notification/notification.service';
import { Storage } from './storage/storage.service';

const http = new Http();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const podcastApi = new PodcastApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const notification = new Notification();

const storage = new Storage({
  storage: localStorage,
});

export { authApi, notification, podcastApi, storage };
