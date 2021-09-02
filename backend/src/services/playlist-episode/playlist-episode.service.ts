import { PlaylistEpisode as TPlaylistEpisode, PlaylistEpisodePayload } from '~/common/types/types';
import { playlistEpisode as playlistEpisodeRep } from '~/data/repositories/repositories';

type Constructor = {
  playlistEpisodeRepository: typeof playlistEpisodeRep;
};

class PlaylistEpisode {
  #playlistEpisodeRepository: typeof playlistEpisodeRep;

  constructor({ playlistEpisodeRepository }: Constructor) {
    this.#playlistEpisodeRepository = playlistEpisodeRepository;
  }

  public create(payload: PlaylistEpisodePayload): Promise<TPlaylistEpisode> {
    return this.#playlistEpisodeRepository.create(payload);
  }

  public delete(payload: PlaylistEpisodePayload): Promise<TPlaylistEpisode> {
    return this.#playlistEpisodeRepository.delete(payload);
  }
}

export { PlaylistEpisode };
