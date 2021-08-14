import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
} from '~/common/types/types';
import { PodcastType } from '~/common/enums/enums';
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
    return this.#PodcastModel.query().where('type', PodcastType.PUBLIC).withGraphJoined('[image, user]');
  }

  public create(payload: PodcastCreateDTOPayload): Promise<TPodcast> {
    return this.#PodcastModel.query().insert(payload).withGraphFetched('image');
  }

  public getById(id: string): Promise<TPodcast> {
    return this.#PodcastModel.query().findById(id).withGraphJoined('[image, user]');
  }

  public update(id: string, payload: PodcastEditDTOPayload): Promise<TPodcast> {
    return this.#PodcastModel.query().updateAndFetchById(id, payload);
  }

  public getAllByUserId(filterParams: { user_id: string }): Promise<TPodcast[]> {
    return this.#PodcastModel.query().where(filterParams).withGraphJoined('image');
  }
}

export { Podcast };
