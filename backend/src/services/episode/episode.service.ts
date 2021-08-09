import { HttpCode } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreatePayload,
} from '~/common/types/types';
import { episode as episodeRep } from '~/data/repositories/repositories';
import { shownote } from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage } from '~/common/enums/enums';

type Constructor = {
  episodeRepository: typeof episodeRep;
  shownoteService: typeof shownote;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #shownoteService: typeof shownote;

  constructor({ episodeRepository, shownoteService }: Constructor) {
    this.#episodeRepository = episodeRepository;
    this.#shownoteService = shownoteService;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public async getById(id: string): Promise<TEpisode> {
    const episode = await this.#episodeRepository.getById(id);
    if (!episode) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.EPISODE_NOT_FOUND,
      });
    }
    return episode;
  }

  public async create(payload: EpisodeCreatePayload): Promise<TEpisode> {
    const episode = await this.#episodeRepository.create({
      name: payload.name,
      userId: payload.userId,
      podcastId: payload.podcastId,
      type: payload.type,
      description: payload.description,
    } as EpisodeCreatePayload);

    const shownotes = payload.shownotes.map((shownote) => ({
      ...shownote,
      episodeId: episode.id,
    }));

    await this.#shownoteService.create(...shownotes);

    return episode;
  }
}

export { Episode };
