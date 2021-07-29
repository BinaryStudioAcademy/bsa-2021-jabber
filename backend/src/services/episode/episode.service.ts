import { Episode as TEpisode, EpisodeCreatePayload } from "~/common/types/types";
import { episode as episodeRep } from '~/data/repositories/repositories';

type Constructor = {
  episodeRepository: typeof episodeRep;
}

class Episode {
  #episodeRepository: typeof episodeRep;

  constructor({ episodeRepository }: Constructor) {
    this.#episodeRepository = episodeRepository
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public setEpisode(payload: EpisodeCreatePayload): Promise<TEpisode> {
    return this.#episodeRepository.create(payload);
  }
}

export { Episode }