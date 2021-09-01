import {
  ApiPath,
  PlaylistsApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  Playlist,
  PlaylistEpisode,
  PlaylistPayload,
  PlaylistEpisodePayload,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class PlaylistApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getById(id: number): Promise<Playlist> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PLAYLISTS}${PlaylistsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getAllByUserId(userId: number): Promise<Playlist[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PLAYLISTS}${PlaylistsApiPath.USERS}/${userId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: PlaylistPayload): Promise<Playlist> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PLAYLISTS}${PlaylistsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public addEpisodeToPlaylist(payload: PlaylistEpisodePayload): Promise<PlaylistEpisode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PLAYLISTS}${PlaylistsApiPath.EPISODES}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public deleteEpisodeFromPlaylist(payload: PlaylistEpisodePayload): Promise<PlaylistEpisode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PLAYLISTS}${PlaylistsApiPath.EPISODES}`,
      {
        method: HttpMethod.DELETE,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { PlaylistApi };
