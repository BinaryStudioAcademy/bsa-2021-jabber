import {
  Genre as TGenre,
} from '~/common/types/types';
import { GenreModel as GenreM } from '~/data/models/models';

type Constructor = {
  GenreModel: typeof GenreM;
};

class Genre {
  #GenreModel: typeof GenreM;

  constructor({ GenreModel }: Constructor) {
    this.#GenreModel = GenreModel;
  }

  public getAll(): Promise<TGenre[]> {
    return this.#GenreModel.query();
  }
}

export { Genre };
