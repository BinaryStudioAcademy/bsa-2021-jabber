import { Podcast as TPodcast } from '~/common/types/types';
import { podcast as podcastRep } from '~/data/repositories/repositories';

type Constructor = {
  podcastRepository: typeof podcastRep;
};

class Podcast {
  #podcastRepository: typeof podcastRep;

  constructor({ podcastRepository }: Constructor) {
    this.#podcastRepository = podcastRepository;
  }

  public getAll(): Promise<TPodcast[]> {
    return this.#podcastRepository.getAll();
  }

  public create(payload: TPodcast): Promise<TPodcast> {
    return this.#podcastRepository.create(payload);
  }
}

export { Podcast };
