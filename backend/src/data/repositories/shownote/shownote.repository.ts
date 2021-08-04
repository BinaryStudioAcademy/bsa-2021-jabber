import { ShownoteModel as ShownoteM } from '~/data/models/models';
import { Shownote as TShownote, ShownoteCreatePayload } from '~/common/types/types';

type Constructor = {
  ShownoteModel: typeof ShownoteM;
};

class Shownote {
  #ShownoteModel: typeof ShownoteM;

  constructor({ ShownoteModel }: Constructor) {
    this.#ShownoteModel = ShownoteModel;
  }

  public create(payload: ShownoteCreatePayload): Promise<TShownote> {
    return this.#ShownoteModel.query().insert(payload);
  }

  public getAllTimeNotesByEpisodeId(id: string): Promise<TShownote[]> {
    return this.#ShownoteModel.query().where('episode_id', id).returning('*');
  }
}

export { Shownote };
