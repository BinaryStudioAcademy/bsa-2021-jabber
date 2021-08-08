import { EpisodeModel as EpisodeM } from '~/data/models/models';
import { Episode as TEpisode, EpisodeCreatePayload, EpisodeEditPayload } from '~/common/types/types';

type Constructor = {
  EpisodeModel: typeof EpisodeM;
};

class Episode {
  #EpisodeModel: typeof EpisodeM;

  constructor({ EpisodeModel }: Constructor) {
    this.#EpisodeModel = EpisodeModel;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#EpisodeModel.query();
  }

  public getById(id: string): Promise<TEpisode> {
    return this.#EpisodeModel.query().findById(id);
  }

  public create(payload: EpisodeCreatePayload): Promise<TEpisode> {
    return this.#EpisodeModel.query().insert(payload);
  }

  public update(id: string, payload: EpisodeEditPayload): Promise<TEpisode> {
    return this.#EpisodeModel.query().updateAndFetchById(id, payload);
  }
}

export { Episode };
