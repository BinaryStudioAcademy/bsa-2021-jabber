import {
  PlaylistEpisode as TPlaylistEpisode,
  PlaylistEpisodePayload,
} from '~/common/types/types';
import { PlaylistEpisodeModel as PlaylistEpisodeM } from '~/data/models/models';

type Constructor = {
  PlaylistEpisodeModel: typeof PlaylistEpisodeM;
};

class PlaylistEpisode {
  #PlaylistEpisodeModel: typeof PlaylistEpisodeM;

  constructor({ PlaylistEpisodeModel }: Constructor) {
    this.#PlaylistEpisodeModel = PlaylistEpisodeModel;
  }

  public create(payload: PlaylistEpisodePayload): Promise<TPlaylistEpisode> {
    return this.#PlaylistEpisodeModel.query().insert(payload);
  }

  public delete({ playlistId, episodeId }: PlaylistEpisodePayload): Promise<TPlaylistEpisode> {
    return this.#PlaylistEpisodeModel.query()
      .delete()
      .where('playlist_id', playlistId)
      .where('episode_id', episodeId)
      .returning('*')
      .first();

  }
}

export { PlaylistEpisode };
