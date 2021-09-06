import {
  Playlist as TPlaylist,
  PlaylistCreatePayload,
  PlaylistCreateDTOPayload,
} from '~/common/types/types';
import {
  playlist as playlistRep,
  image as imageRep,
  playlistInvitationCode as playlistInvitationCodeRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpCode, ErrorMessage } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  playlistRepository: typeof playlistRep;
  fileStorage: FileStorage;
  imageRepository: typeof imageRep;
  playlistInvitationCodeRepository: typeof playlistInvitationCodeRep;
};

class Playlist {
  #playlistRepository: typeof playlistRep;
  #fileStorage: FileStorage;
  #imageRepository: typeof imageRep;
  #playlistInvitationCodeRepository: typeof playlistInvitationCodeRep;

  constructor({
    playlistRepository,
    fileStorage,
    imageRepository,
    playlistInvitationCodeRepository,
  }: Constructor) {
    this.#playlistRepository = playlistRepository;
    this.#fileStorage = fileStorage;
    this.#imageRepository = imageRepository;
    this.#playlistInvitationCodeRepository = playlistInvitationCodeRepository;
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
}

export { Playlist };
