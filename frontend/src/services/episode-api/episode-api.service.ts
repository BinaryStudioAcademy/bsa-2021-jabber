import {
  ApiPath,
  EpisodesApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import {
  Episode,
  EpisodeCreatePayload,
  EpisodeEditPayload,
  EpisodeQueryPayload,
  LoadEpisodesByPodcastIdPayload,
  UserFavouriteEpisode,
  UserFavouriteEpisodePayload,
  UserFavouriteEpisodeResponse,
  LoadFavouriteEpisodesPayload,
  LoadPlaylistEpisodesPayload,
  PlaylistEpisodeResponse,
} from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class EpisodeApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<Episode[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getById(id: number): Promise<Episode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getByQueryByPodcastId({ podcastId, filter }: LoadEpisodesByPodcastIdPayload): Promise<EpisodeQueryPayload> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.PODCAST}/${podcastId}`,
      {
        method: HttpMethod.GET,
        query: filter,
      },
    );
  }

  public getByQueryByPlaylistId({ playlistId, filter }: LoadPlaylistEpisodesPayload): Promise<PlaylistEpisodeResponse> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PLAYLISTS}/${playlistId}`,
      {
        method: HttpMethod.GET,
        query: filter,
      },
    );
  }

  public create(payload: EpisodeCreatePayload): Promise<Episode> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.EPISODES}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  public update(id: number, payload: EpisodeEditPayload): Promise<Episode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public delete(id: number): Promise<Episode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  public checkEpisodeIsFavourite(episodeId: number): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}/${EpisodesApiPath.FAVOURITES}/${episodeId}${ApiPath.EPISODES}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getFavoriteEpisodesByUserId({ userId, filter }: LoadFavouriteEpisodesPayload): Promise<UserFavouriteEpisodeResponse> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}/${EpisodesApiPath.FAVOURITES}/${userId}`,
      {
        method: HttpMethod.GET,
        query: filter,
      },
    );
  }

  public addEpisodeToFavourites(payload: UserFavouriteEpisodePayload): Promise<UserFavouriteEpisode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}/${EpisodesApiPath.FAVOURITES}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public deleteEpisodeFromFavourites(payload: UserFavouriteEpisodePayload): Promise<UserFavouriteEpisode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}/${EpisodesApiPath.FAVOURITES}`,
      {
        method: HttpMethod.DELETE,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

}

export { EpisodeApi };
