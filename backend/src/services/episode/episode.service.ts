import { HttpCode } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreatePayload,
} from '~/common/types/types';
import { episode as episodeRep } from '~/data/repositories/repositories';
import { shownote } from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage } from '~/common/enums/enums';
import { EpisodeCreatePayloadKey } from 'jabber-shared/common/enums/enums';

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
        message: ErrorMessage.NOT_FOUND,
      });
    }
    return episode;
  }

  public async create(payload: EpisodeCreatePayload): Promise<TEpisode> {
    const episodePayload = {
      [EpisodeCreatePayloadKey.NAME]: payload[EpisodeCreatePayloadKey.NAME],
      [EpisodeCreatePayloadKey.USER_ID]:
        payload[EpisodeCreatePayloadKey.USER_ID],
      [EpisodeCreatePayloadKey.PODCAST_ID]:
        payload[EpisodeCreatePayloadKey.PODCAST_ID],
      [EpisodeCreatePayloadKey.TYPE]: payload[EpisodeCreatePayloadKey.TYPE],
      [EpisodeCreatePayloadKey.DESCRIPTION]:
        payload[EpisodeCreatePayloadKey.DESCRIPTION],
    } as EpisodeCreatePayload;

    const episode = await this.#episodeRepository.create(episodePayload);
    const shownotes = payload[EpisodeCreatePayloadKey.SHOWNOTES];

    for (const shownote of shownotes) {
      await this.#shownoteService.create({
        ...shownote,
        episodeId: episode.id,
      });
    }

    return episode;
  }
}

export { Episode };
