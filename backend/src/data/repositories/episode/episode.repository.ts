import { EpisodeModel as EpisodeM } from '~/data/models/models';
import { Episode as TEpisode, EpisodeCreateDTOPayload } from '~/common/types/types';

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

  public getAllByPodcastId(id: string): Promise<TEpisode[]> {
    return this.#EpisodeModel.query().where('podcast_id', id);
  }

  public create(payload: EpisodeCreateDTOPayload): Promise<TEpisode> {
    return this.#EpisodeModel.query().insert(payload);
  }
}

export { Episode };
