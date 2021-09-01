import { Playlist as TPlaylist, PlaylistPayload } from '~/common/types/types';
import { playlist as playlistRep } from '~/data/repositories/repositories';

type Constructor = {
  playlistRepository: typeof playlistRep;
};

class Playlist {
  #playlistRepository: typeof playlistRep;

  constructor({ playlistRepository }: Constructor) {
    this.#playlistRepository = playlistRepository;
  }

  public getAllByUserId(userId: number): Promise<TPlaylist[]> {
    return this.#playlistRepository.getAllByUserId(userId);
  }

  public getById(id: number): Promise<TPlaylist> {
    return this.#playlistRepository.getById(id);
  }

  public create(payload: PlaylistPayload): Promise<TPlaylist> {
    return this.#playlistRepository.create(payload);
  }
}

export { Playlist };
