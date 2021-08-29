import {
  UserFavouriteEpisode as TUserFavouriteEpisode,
  UserFavouriteEpisodePayload,
} from '~/common/types/types';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';
import { userFavouriteEpisode as userFavouriteEpisodeRep } from '~/data/repositories/repositories';

type Constructor = {
  userFavouriteEpisodeRepository: typeof userFavouriteEpisodeRep;
};

class UserFavouriteEpisode {
  #userFavouriteEpisodeRepository: typeof userFavouriteEpisodeRep;

  constructor({ userFavouriteEpisodeRepository }: Constructor) {
    this.#userFavouriteEpisodeRepository = userFavouriteEpisodeRepository;
  }

  public async checkEpisodeIsFavorite(payload: UserFavouriteEpisodePayload): Promise<boolean> {
    const episode = await this.#userFavouriteEpisodeRepository.getByUserIdEpisodeId(payload);

    return Boolean(episode);
  }

  public async create(payload: UserFavouriteEpisodePayload): Promise<TUserFavouriteEpisode> {
    const episode = await this.#userFavouriteEpisodeRepository.getByUserIdEpisodeId(payload);

    if (episode) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.ALREADY_IN_FAVOURITES,
      });
    }

    return this.#userFavouriteEpisodeRepository.create(payload);
  }

  public delete(payload: UserFavouriteEpisodePayload): Promise<TUserFavouriteEpisode> {
    return this.#userFavouriteEpisodeRepository.delete(payload);
  }
}

export { UserFavouriteEpisode };
