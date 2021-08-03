import { Podcast as TPodcast, PodcastCreatePayload } from '~/common/types/types';
import { podcast as podcastRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/enums';
import { ErrorMessage } from '~/common/enums/app/error-message.enum';

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


  public async getById(id: string): Promise<TPodcast> {
    const podcast = await this.#podcastRepository.getById(id);
    if (!podcast) {
      throw new HttpError({ status: HttpCode.NOT_FOUND, message: ErrorMessage.PODCAST_NOT_FOUND });
    }
    return podcast;
  }

  public create(payload: PodcastCreatePayload): Promise<TPodcast> {
    return this.#podcastRepository.create(payload);
  }

  public update(id: string, payload: PodcastCreatePayload): Promise<TPodcast> {
    return this.#podcastRepository.update(id, payload);
  }
}

export { Podcast };
