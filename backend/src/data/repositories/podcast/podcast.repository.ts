import { Podcast as TPodcast } from '~/common/types/types';
import { PodcastModel as PodcastM } from '~/data/models/models';

type Constructor = {
  PodcastModel: typeof PodcastM;
};

type PodcastCreateDTOPayload = {
  name: string;
  userId: number;
  imageId: number | null;
  description: string;
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
    return this.#PodcastModel
      .query()
      .insert(payload)
      .withGraphFetched('imageRel');
  }
}

export { Podcast };
