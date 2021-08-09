import { HttpCode } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreatePayload,
} from '~/common/types/types';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import {
  episode as episodeRep,
  record as recordRep,
} from '~/data/repositories/repositories';
import { shownote } from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage } from '~/common/enums/enums';

type Constructor = {
  episodeRepository: typeof episodeRep;
  shownoteService: typeof shownote;
  recordRepository: typeof recordRep;
  fileStorage: FileStorage;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #shownoteService: typeof shownote;
  #fileStorage: FileStorage;
  #recordRepository: typeof recordRep;

  constructor({
    episodeRepository,
    shownoteService,
    fileStorage,
    recordRepository,
  }: Constructor) {
    this.#episodeRepository = episodeRepository;
    this.#shownoteService = shownoteService;
    this.#fileStorage = fileStorage;
    this.#recordRepository = recordRepository;
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
    const { userId, recordDataUrl, type, description, name, podcastId } =
      payload;

    const episode = await this.#episodeRepository.create({
      name,
      description,
      podcastId,
      type,
      userId,
    });

    const shownotes = payload.shownotes.map((shownote) => ({
      ...shownote,
      episodeId: episode.id,
    }));

    await this.#shownoteService.create(...shownotes);

    if (recordDataUrl) {
      const { url, publicId, bytes } = await this.#fileStorage.upload({
        dataUrl: recordDataUrl,
        userId,
      });

      await this.#recordRepository.create({
        fileUrl: url,
        publicId,
        episodeId: episode.id,
        fileSize: bytes,
      });
    }

    return episode;
  }

  public getAllByPodcastId(id: string): Promise<TEpisode[]> {
    return this.#episodeRepository.getAllByPodcastId(id);
  }
}

export { Episode };
