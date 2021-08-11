import { HttpCode, ErrorMessage } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreateDTOPayload,
  EpisodeCreatePayload,
  EpisodeEditPayload,
} from '~/common/types/types';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import {
  episode as episodeRep,
  record as recordRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { shownote } from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  episodeRepository: typeof episodeRep;
  shownoteService: typeof shownote;
  imageRepository: typeof imageRep;
  recordRepository: typeof recordRep;
  fileStorage: FileStorage;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #shownoteService: typeof shownote;
  #fileStorage: FileStorage;
  #recordRepository: typeof recordRep;
  #imageRepository: typeof imageRep;

  constructor({
    episodeRepository,
    shownoteService,
    fileStorage,
    recordRepository,
    imageRepository,
  }: Constructor) {

    this.#episodeRepository = episodeRepository;
    this.#shownoteService = shownoteService;
    this.#fileStorage = fileStorage;
    this.#recordRepository = recordRepository;
    this.#imageRepository = imageRepository;
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

  public async create({
    userId,
    recordDataUrl,
    imageDataUrl,
    type,
    description,
    shownotes,
    name,
    podcastId,
    status,
  }: EpisodeCreatePayload): Promise<TEpisode> {
    const newEpisode: EpisodeCreateDTOPayload = {
      userId,
      type,
      description,
      name,
      podcastId,
      status,
      imageId: null,
    };

    if (imageDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imageDataUrl,
        userId,
      });

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      newEpisode.imageId = image.id;
    }

    const episode = await this.#episodeRepository.create(newEpisode);

    if (shownotes.length) {
      await this.#shownoteService.create(
        ...shownotes.map((shownote) => ({
          ...shownote,
          episodeId: episode.id,
        })),
      );
    }

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
    const {
      recordDataUrl,
      imageDataUrl,
      type,
      description,
      name,
      userId,
      imageId,
      status,
    } = payload;
    const episodeId = Number(id);
    let newImageId: number | null = null;

    if (recordDataUrl) {
      const { url, publicId, bytes } = await this.#fileStorage.upload({
        dataUrl: recordDataUrl,
        userId,
      });

      await this.#recordRepository.create({
        publicId,
        episodeId,
        fileUrl: url,
        fileSize: bytes,
      });

      const { id, publicId: oldRecordPublicId } = await this.#recordRepository.getByEpisodeId(episodeId);

      if (id) {
        await this.#fileStorage.delete(oldRecordPublicId);
        await this.#recordRepository.delete(id);
      }
    }

    if (imageDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imageDataUrl,
        userId,
      });

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      newImageId = image.id;
    }

    const episode = await this.#episodeRepository.update(id, {
      name,
      description,
      type,
      status,
      imageId: newImageId ?? imageId,
    });

    if (imageDataUrl && imageId) {
      const oldImage = await this.#imageRepository.getById(imageId);

      await this.#imageRepository.delete(oldImage.id);
      await this.#fileStorage.delete(oldImage.publicId);
    }

    return episode;
  }

  public getAllByPodcastId(id: string): Promise<TEpisode[]> {
    return this.#episodeRepository.getAllByPodcastId(id);
  }
}

export { Episode };
