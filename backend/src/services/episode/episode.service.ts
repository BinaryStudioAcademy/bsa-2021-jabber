import { Episode as TEpisode, EpisodeCreatePayload } from '~/common/types/types';
import { episode as episodeRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  episodeRepository: typeof episodeRep;
};

class Episode {
  #episodeRepository: typeof episodeRep;

  constructor({ episodeRepository }: Constructor) {
    this.#episodeRepository = episodeRepository;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public async getById(id: string): Promise<TEpisode> {
    const episode = await this.#episodeRepository.getById(id);
    if (!episode) {
      throw new HttpError({ status: 404, message: 'Episode does not exist!' });
    }
    return episode;
  }

  public create(payload: EpisodeCreatePayload): Promise<TEpisode> {
    return this.#episodeRepository.create(payload);
  }
}

export { Episode };
