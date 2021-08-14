import {
  Genre as TGenre,
} from '~/common/types/types';
import {
  genre as genreRep,
} from '~/data/repositories/repositories';

type Constructor = {
  genreRepository: typeof genreRep;
};

class Genre {
  #genreRepository: typeof genreRep;

  constructor({
    genreRepository,
  }: Constructor) {
    this.#genreRepository = genreRepository;

  }

  public getAll(): Promise<TGenre[]> {
    return this.#genreRepository.getAll();
  }
}

export { Genre };
