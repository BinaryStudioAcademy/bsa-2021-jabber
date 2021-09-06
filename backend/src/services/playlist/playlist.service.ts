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
  playlistInvitationCode as playlistInvitationCodeRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpError } from '~/exceptions/exceptions';
import { image, playlistEpisode } from '~/services/services';


type Constructor = {
  playlistRepository: typeof playlistRep;
  fileStorage: FileStorage;
  imageRepository: typeof imageRep;
  playlistInvitationCodeRepository: typeof playlistInvitationCodeRep;
  imageService: typeof image;
  playlistEpisodeService: typeof playlistEpisode;
};

class Playlist {
  #playlistRepository: typeof playlistRep;
  #fileStorage: FileStorage;
  #imageRepository: typeof imageRep;
  #playlistInvitationCodeRepository: typeof playlistInvitationCodeRep;
  #imageService: typeof image;
  #playlistEpisodeService: typeof playlistEpisode;

  constructor({
    playlistRepository,
    fileStorage,
    imageRepository,
    playlistInvitationCodeRepository,
    imageService,
    playlistEpisodeService,
  }: Constructor) {
    this.#playlistRepository = playlistRepository;
    this.#fileStorage = fileStorage;
    this.#imageRepository = imageRepository;
    this.#playlistInvitationCodeRepository = playlistInvitationCodeRepository;
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
    invitationCode,
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

    const playlist = await this.#playlistRepository.create(newPlaylist);

    if (invitationCode) {
      await this.#playlistInvitationCodeRepository.create({
        playlistId: playlist.id,
        code: invitationCode,
      });
    }

    return playlist;
  }

  public async invite(code: string): Promise<TPlaylist> {
    const invitationCode = await this.#playlistInvitationCodeRepository.getByCode(code);

    if (!invitationCode) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.PLAYLIST_NOT_FOUND,
      });
    }

    return this.#playlistRepository.getById(invitationCode.playlistId);
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
