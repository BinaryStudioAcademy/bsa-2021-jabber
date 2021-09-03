import {
  Playlist as TPlaylist,
  PlaylistPayload,
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

  public create(payload: PlaylistPayload): Promise<TPlaylist> {
    return this.#PlaylistModel.query().insert(payload);
  }

  public getAllByUserId(userId: number): Promise<TPlaylist[]>{
    return this.#PlaylistModel.query()
      .where('user_id', userId)
      .withGraphFetched('user');
  }

  public getById(id: number): Promise<TPlaylist>{
    return this.#PlaylistModel.query().findById(id);
  }
}

export { Playlist };
