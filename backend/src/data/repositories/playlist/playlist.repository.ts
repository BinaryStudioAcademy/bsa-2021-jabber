import {
  Playlist as TPlaylist,
  PlaylistCreateDTOPayload,
} from '~/common/types/types';
import { PlaylistModel as PlaylistM } from '~/data/models/models';
import { POPULAR_PLAYLIST_LOAD_LIMIT } from '~/common/constants/constants';

type Constructor = {
  PlaylistModel: typeof PlaylistM;
};

class Playlist {
  #PlaylistModel: typeof PlaylistM;

  constructor({ PlaylistModel }: Constructor) {
    this.#PlaylistModel = PlaylistModel;
  }

  public create(payload: PlaylistCreateDTOPayload): Promise<TPlaylist> {
    return this.#PlaylistModel
      .query()
      .insert(payload)
      .withGraphFetched('[cover]');
  }

  public getAllByUserId(userId: number): Promise<TPlaylist[]>{
    return this.#PlaylistModel.query()
      .where('user_id', userId)
      .withGraphFetched('[user, cover]');
  }

  public getById(id: number): Promise<TPlaylist>{
    return this.#PlaylistModel.query().findById(id);
  }

  public getPopular(): Promise<TPlaylist[]>{
    return this.#PlaylistModel
      .query()
      .limit(POPULAR_PLAYLIST_LOAD_LIMIT)
      .withGraphFetched('[user, cover]');
  }
}

export { Playlist };
