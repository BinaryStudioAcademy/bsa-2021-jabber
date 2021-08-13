import {
  Shownote as TShownote,
  ShownoteCreatePayload,
} from '~/common/types/types';
import { shownote as shownoteRep } from '~/data/repositories/repositories';

type Constructor = {
  shownoteRepository: typeof shownoteRep;
};

class Shownote {
  #shownoteRepository: typeof shownoteRep;

  constructor({ shownoteRepository }: Constructor) {
    this.#shownoteRepository = shownoteRepository;
  }

  public async create(
    ...payload: ShownoteCreatePayload[]
  ): Promise<TShownote[]> {
    return await this.#shownoteRepository.create(payload);
  }

  public async getAllByEpisodeId(id: number): Promise<TShownote[]> {
    return await this.#shownoteRepository.getAllByEpisodeId(id);
  }

  public async deleteAllByEpisodeId(id: number): Promise<number> {
    return await this.#shownoteRepository.deleteAllByEpisodeId(id);
  }
}

export { Shownote };
