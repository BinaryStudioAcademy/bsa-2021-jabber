import { HttpCode, ErrorMessage } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreatePayload,
  EpisodeEditPayload,
} from '~/common/types/types';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import {
  episode as episodeRep,
  record as recordRep,
} from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  episodeRepository: typeof episodeRep;
  recordRepository: typeof recordRep;
  fileStorage: FileStorage;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #fileStorage: FileStorage;
  #recordRepository: typeof recordRep;

  constructor({ episodeRepository, fileStorage, recordRepository }: Constructor) {
    this.#episodeRepository = episodeRepository;
    this.#fileStorage = fileStorage;
    this.#recordRepository = recordRepository;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public async getById(id: string): Promise<TEpisode> {
    const episode = await this.#episodeRepository.getById(id);
    if (!episode) {
      throw new HttpError({ status: HttpCode.NOT_FOUND, message: ErrorMessage.NOT_FOUND });
    }
    return episode;
  }

  public async create(payload: EpisodeCreatePayload): Promise<TEpisode> {
    const { userId, recordDataUrl, type, description, name, podcastId } = payload;

    const episode = await this.#episodeRepository.create({
      name,
      description,
      podcastId,
      type,
      userId,
    });

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

  public async update(id: string, payload: EpisodeEditPayload): Promise<TEpisode> {
    const { recordDataUrl, type, description, name, userId } = payload;

    const episode = await this.#episodeRepository.update(id, {
      name,
      description,
      type,
    });

    if (recordDataUrl) {
      const { url, publicId, bytes } = await this.#fileStorage.upload({
        dataUrl: recordDataUrl,
        userId: userId,
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
}

export { Episode };
