import { Podcast as TPodcast, PodcastCreatePayload } from '~/common/types/types';
import { PodcastModel as PodcastM } from '~/data/models/models';

type Constructor = {
  PodcastModel: typeof PodcastM;
};

class Podcast {
  #PodcastModel: typeof PodcastM;

  constructor({ PodcastModel }: Constructor) {
    this.#PodcastModel = PodcastModel;
  }

  public getAll(): Promise<TPodcast[]> {
    return this.#PodcastModel.query();
  }

  public getById(id: string): Promise<TPodcast> {
    return this.#PodcastModel.query().findById(id);
  }

  public create(payload: PodcastCreatePayload): Promise<TPodcast> {
    return this.#PodcastModel.query().insert(payload);
  }

  public update(id: string, payload: PodcastCreatePayload): Promise<TPodcast> {
    return this.#PodcastModel.query().updateAndFetchById(id, payload);
  }
}

export { Podcast };
