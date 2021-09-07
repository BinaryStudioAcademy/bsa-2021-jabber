import {
  User as TUser,
  TokenPayload,
  UserEditPayload,
  UserEditDTOPayload,
  UserPopularLoadFilter,
} from '~/common/types/types';
import { user as userRep, image as imageRep } from '~/data/repositories/repositories';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';
import { token } from '~/services/services';
import { FileStorage } from '~/services/file-storage/file-storage.service';

type Constructor = {
  userRepository: typeof userRep;
  tokenService: typeof token;
  imageRepository: typeof imageRep;
  fileStorage: FileStorage;
};

class User {
  #userRepository: typeof userRep;
  #tokenService: typeof token;
  #imageRepository: typeof imageRep;
  #fileStorage: FileStorage;

  constructor({ userRepository, tokenService, imageRepository, fileStorage }: Constructor) {
    this.#userRepository = userRepository;
    this.#tokenService = tokenService;
    this.#imageRepository = imageRepository;
    this.#fileStorage = fileStorage;
  }

  public getAll(): Promise<TUser[]> {
    return this.#userRepository.getAll();
  }

  public async getById(id: number): Promise<TUser> {
    const user = await this.#userRepository.getById(id);
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    }

    return user;
  }

  public async update(id: number, payload: UserEditPayload): Promise<TUser> {
    const { firstName, lastName, email, bio, nickname, birthdate, imageDataUrl, imageId } = payload;
    const userWithSimilarEmail = await this.#userRepository.getByEmail(
      payload.email,
    );

    const hasSimilarEmail = Boolean(userWithSimilarEmail);
    const isAnotherUserEmail =
      hasSimilarEmail && userWithSimilarEmail.id !== id;

    if (isAnotherUserEmail) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.EMAIL_IS_ALREADY_TAKEN,
      });
    }

    const updateUser: UserEditDTOPayload = {
      firstName,
      lastName,
      email,
      bio,
      nickname,
      birthdate,
      imageId,
    };

    let deleteImageId: number | null = null;

    if (imageDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imageDataUrl,
        userId: id,
      });

      deleteImageId = imageId;

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      updateUser.imageId = image.id;
    }

    const user = await this.#userRepository.update(id, updateUser);

    if (deleteImageId) {
      const { publicId } = await this.#imageRepository.getById(deleteImageId);
      await this.#fileStorage.delete(publicId);
      await this.#imageRepository.delete(deleteImageId);
    }

    return user;
  }

  public async getByToken(token: string): Promise<TUser> {
    const decoded = this.#tokenService.decode<TokenPayload>(token);
    if (!decoded) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.UNAUTHORIZED_TOKEN,
      });
    }
    const user = await this.#userRepository.getById(Number(decoded.userId));

    return user;
  }

  public getPopular(filter: UserPopularLoadFilter): Promise<TUser[]> {
    return this.#userRepository.getPopular(filter);
  }

  public getFollowersByUserId(userId: number): Promise<TUser[]> {
    return this.#userRepository.getFollowersByUserId(userId);
  }
}
export { User };
