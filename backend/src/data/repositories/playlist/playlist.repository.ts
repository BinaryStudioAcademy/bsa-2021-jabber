import { raw } from 'objection';
import {
  Playlist as TPlaylist,
  PlaylistCreateDTOPayload,
  PlaylistEditDTOPayload,
} from '~/common/types/types';
import { PodcastType } from '~/common/enums/enums';
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
    return this.#PlaylistModel.query()
      .findById(id)
      .withGraphFetched('[cover]');
  }

  public getPopular(): Promise<TPlaylist[]> {
    return this.#PlaylistModel.query()
      .select(raw('playlists.*, count(*) as commentsCount'))
      .from(raw('playlists, playlists_episodes, episodes, comments, podcasts'))
      .whereRaw('playlists.id = playlists_episodes.playlist_id')
      .whereRaw('playlists_episodes.episode_id = episodes.id')
      .whereRaw('podcasts.id = episodes.podcast_id')
      .where('podcasts.type', PodcastType.PUBLIC)
      .whereRaw('episodes.id = comments.episode_id')
      .groupByRaw('playlists.id')
      .orderByRaw('commentsCount DESC')
      .withGraphFetched('[user, cover]')
      .limit(POPULAR_PLAYLIST_LOAD_LIMIT);
  }

  public update(id: string, payload: PlaylistEditDTOPayload): Promise<TPlaylist> {
    return this.#PlaylistModel
      .query()
      .updateAndFetchById(id, payload);
  }

  public delete(id: number): Promise<TPlaylist> {
    return this.#PlaylistModel.query().deleteById(id).returning('*').first();
  }
}

export { Playlist };
