import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { PodcastApi } from './podcast-api/podcast-api.service';
import { ImageApi } from './image-api/image-api.service';
import { Notification } from './notification/notification.service';
import { Datauri } from './datauri/datauri.service';
import { EpisodeApi } from './episode-api/episode-api.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({
  storage: localStorage,
});

const http = new Http({
  storage,
});

const datauri = new Datauri();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const podcastApi = new PodcastApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const imageApi = new ImageApi({
  http,
  datauri,
  apiPrefix: ENV.API_PATH,
});

const episodeApi = new EpisodeApi({
  http,
  apiPrefix: ENV.API_PATH,
});

const notification = new Notification();

export {
  authApi,
  notification,
  podcastApi,
  episodeApi,
  storage,
  imageApi,
  datauri,
};
