import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
} from '~/common/types/types';
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

  public create(payload: PodcastCreateDTOPayload): Promise<TPodcast> {
    return this.#PodcastModel.query().insert(payload).withGraphFetched('image');
  }

  public getById(id: string): Promise<TPodcast> {
    return this.#PodcastModel.query().findById(id);
  }

  public getByTitle(title: string): Promise<any> {
    return this.#PodcastModel.query().whereRaw(`REPLACE(name, ' ', '') ILIKE REPLACE('%${title}%', ' ', '')`);
  }

  public update(id: string, payload: PodcastEditDTOPayload): Promise<TPodcast> {
    return this.#PodcastModel.query().updateAndFetchById(id, payload);
  }
}

export { Podcast };
