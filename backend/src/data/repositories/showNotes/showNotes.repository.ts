import { ShowNotesModel as ShowNotesM } from '~/data/models/models';
import { ShowNotes as TShowNotes, ShowNotesCreatePayload } from '~/common/types/types';

type Constructor = {
  ShowNotesModel: typeof ShowNotesM;
};

class ShowNotes {
  #ShowNotesModel: typeof ShowNotesM;

  constructor({ ShowNotesModel }: Constructor) {
    this.#ShowNotesModel = ShowNotesModel;
  }

  public create(payload: ShowNotesCreatePayload): Promise<TShowNotes> {
    return this.#ShowNotesModel.query().insert(payload);
  }

  public getAllTimeNotesByEpisodeId(id: string): Promise<TShowNotes[]> {
    return this.#ShowNotesModel.query().where('episode_id', id);
  }
}

export { ShowNotes };
