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

type Constructor = {
  playlistRepository: typeof playlistRep;
  fileStorage: FileStorage;
  imageRepository: typeof imageRep;
};

class Playlist {
  #playlistRepository: typeof playlistRep;
  #fileStorage: FileStorage;
  #imageRepository: typeof imageRep;

  constructor({
    playlistRepository,
    fileStorage,
    imageRepository,
  }: Constructor) {
    this.#playlistRepository = playlistRepository;
    this.#fileStorage = fileStorage;
    this.#imageRepository = imageRepository;
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
}

export { Playlist };
