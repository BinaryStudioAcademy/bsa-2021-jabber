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

  public create(payload: ShownoteCreatePayload): Promise<TShownote> {
    return this.#shownoteRepository.create(payload);
  }

  public async getAllByEpisodeId(id: string): Promise<TShownote[]> {
    return await this.#shownoteRepository.getAllByEpisodeId(id);
  }
}

export { Shownote };
