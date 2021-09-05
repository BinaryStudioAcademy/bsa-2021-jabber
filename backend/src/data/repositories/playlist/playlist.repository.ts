import { raw } from 'objection';
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

  public getAllByUserId(userId: number): Promise<TPlaylist[]> {
    return this.#PlaylistModel.query()
      .where('user_id', userId)
      .withGraphFetched('[user, cover]');
  }

  public getById(id: number): Promise<TPlaylist> {
    return this.#PlaylistModel.query().findById(id);
  }

  public getPopular(): Promise<TPlaylist[]> {
    return this.#PlaylistModel.query()
      .select(raw('playlists.*, count(*) as commentsCount'))
      .from(raw('playlists, playlists_episodes, episodes, comments'))
      .whereRaw('playlists.id = playlists_episodes.playlist_id')
      .whereRaw('playlists_episodes.episode_id = episodes.id')
      .whereRaw('episodes.id = comments.episode_id')
      .groupByRaw('playlists.id')
      .orderByRaw('commentsCount DESC')
      .withGraphFetched('[user, cover]')
      .limit(POPULAR_PLAYLIST_LOAD_LIMIT);
  }
}

export { Playlist };
