import { PlaylistEpisode as TPlaylistEpisode, PlaylistEpisodePayload } from '~/common/types/types';
import { playlistEpisode as playlistEpisodeRep } from '~/data/repositories/repositories';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  playlistEpisodeRepository: typeof playlistEpisodeRep;
};

class PlaylistEpisode {
  #playlistEpisodeRepository: typeof playlistEpisodeRep;

  constructor({ playlistEpisodeRepository }: Constructor) {
    this.#playlistEpisodeRepository = playlistEpisodeRepository;
  }

  public async create(payload: PlaylistEpisodePayload): Promise<TPlaylistEpisode> {
    const episode = await this.#playlistEpisodeRepository.getByPlaylistIdEpisodeId(payload);

    if (episode) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.ALREADY_IN_PLAYLIST,
      });
    }

    return this.#playlistEpisodeRepository.create(payload);
  }

  public delete(payload: PlaylistEpisodePayload): Promise<TPlaylistEpisode> {
    return this.#playlistEpisodeRepository.delete(payload);
  }

  public deleteAllByPlaylistId(id: number): Promise<TPlaylistEpisode[]> {
    return this.#playlistEpisodeRepository.deleteAllByPlaylistId(id);
  }

  public deleteAllByEpisodeId(id: number): Promise<TPlaylistEpisode[]> {
    return this.#playlistEpisodeRepository.deleteAllByEpisodeId(id);
  }
}

export { PlaylistEpisode };
