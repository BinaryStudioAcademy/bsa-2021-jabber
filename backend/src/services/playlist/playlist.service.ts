import { HttpCode, ErrorMessage } from '~/common/enums/enums';
import {
  Playlist as TPlaylist,
  PlaylistCreatePayload,
  PlaylistCreateDTOPayload,
  PlaylistEditDTOPayload,
  PlaylistEditPayload,
} from '~/common/types/types';
import {
  playlist as playlistRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpError } from '~/exceptions/exceptions';
import { image, playlistEpisode } from '~/services/services';

type Constructor = {
  playlistRepository: typeof playlistRep;
  fileStorage: FileStorage;
  imageRepository: typeof imageRep;
  imageService: typeof image;
  playlistEpisodeService: typeof playlistEpisode;
};

class Playlist {
  #playlistRepository: typeof playlistRep;
  #fileStorage: FileStorage;
  #imageRepository: typeof imageRep;
  #imageService: typeof image;
  #playlistEpisodeService: typeof playlistEpisode;

  constructor({
    playlistRepository,
    fileStorage,
    imageRepository,
    imageService,
    playlistEpisodeService,
  }: Constructor) {
    this.#playlistRepository = playlistRepository;
    this.#fileStorage = fileStorage;
    this.#imageRepository = imageRepository;
    this.#imageService = imageService;
    this.#playlistEpisodeService = playlistEpisodeService;
  }

  public getAllByUserId(userId: number): Promise<TPlaylist[]> {
    return this.#playlistRepository.getAllByUserId(userId);
  }

  public getById(id: number): Promise<TPlaylist> {
    return this.#playlistRepository.getById(id);
  }

  public async create({
    name,
    description,
    status,
    coverDataUrl,
    userId,
  }: PlaylistCreatePayload): Promise<TPlaylist> {
    const newPlaylist: PlaylistCreateDTOPayload = {
      name,
      description,
      status,
      coverId: null,
      userId,
    };

    if (coverDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: coverDataUrl,
        userId,
      });

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      newPlaylist.coverId = image.id;
    }

    return this.#playlistRepository.create(newPlaylist);
  }

  public getPopular(): Promise<TPlaylist[]> {
    return this.#playlistRepository.getPopular();
  }

  public async update(
    id: string,
    {
      name,
      userId,
      coverDataUrl,
      coverId,
      description,
      status,
    }: PlaylistEditPayload,
  ): Promise<TPlaylist> {
    const updatePlaylist: PlaylistEditDTOPayload = {
      name,
      coverId,
      description,
      status,
    };

    let deleteCoverId: number | null = null;

    if (coverDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: coverDataUrl,
        userId,
      });

      deleteCoverId = coverId;

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      updatePlaylist.coverId = image.id;
    }

    const playlist = await this.#playlistRepository.update(id, updatePlaylist);

    if (deleteCoverId) {
      const { publicId } = await this.#imageRepository.getById(deleteCoverId);
      await this.#fileStorage.delete(publicId);
      await this.#imageRepository.delete(deleteCoverId);
    }

    return playlist;
  }

  public async delete(id: number): Promise<TPlaylist> {
    const playlist = await this.#playlistRepository.getById(id);

    if (!playlist) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.PODCAST_NOT_FOUND,
      });
    }

    await this.#playlistEpisodeService.deleteAllByPlaylistId(playlist.id);

    await this.#playlistRepository.delete(id);

    if (playlist.coverId) {
      await this.#imageService.delete(playlist.coverId);
    }

    return playlist;
  }
}

export { Playlist };
