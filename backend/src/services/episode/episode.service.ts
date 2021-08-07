import { HttpCode } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreatePayload,
} from '~/common/types/types';
import { episode as episodeRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage } from '~/common/enums/enums';

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
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.NOT_FOUND,
      });
    }
    return episode;
  }

  public async getByPodcastId(id: string): Promise<TEpisode[]> {
    const episodes = await this.#episodeRepository.getByPodcastId(id);
    if (!episodes) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.NOT_FOUND,
      });
    }
    return episodes;
  }

  public create(payload: EpisodeCreatePayload): Promise<TEpisode> {
    return this.#episodeRepository.create(payload);
  }
}

export { Episode };
