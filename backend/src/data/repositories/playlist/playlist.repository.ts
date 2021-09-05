import {
  Playlist as TPlaylist,
  PlaylistCreateDTOPayload,
} from '~/common/types/types';
import { PlaylistModel as PlaylistM } from '~/data/models/models';

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
      .where('user_id', userId);
  }

  public getById(id: number): Promise<TPlaylist>{
    return this.#PlaylistModel
      .query()
      .findById(id)
      .withGraphFetched('[cover]');
  }
}

export { Playlist };
