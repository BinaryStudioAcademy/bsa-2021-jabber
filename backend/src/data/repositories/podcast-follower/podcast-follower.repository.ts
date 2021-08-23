import {
  PodcastFollower as TPodcastFollover,
  PodcastFollowerPayload,
} from '~/common/types/types';
import { PodcastFollowerModel as PodcastFollowerM } from '~/data/models/models';

type Constructor = {
  PodcastFollowerModel: typeof PodcastFollowerM;
};

class PodcastFollower {
  #PodcastFollowerModel: typeof PodcastFollowerM;

  constructor({ PodcastFollowerModel }: Constructor) {
    this.#PodcastFollowerModel = PodcastFollowerModel;
  }

  public getPodcastFollower(podcastFollowerPayload: PodcastFollowerPayload): Promise<TPodcastFollover> {
    return this.#PodcastFollowerModel.query().findOne({
      podcastId: podcastFollowerPayload.podcastId,
      followerId: podcastFollowerPayload.followerId,
    });
  }

  public create(payload: PodcastFollowerPayload): Promise<TPodcastFollover> {
    return this.#PodcastFollowerModel.query().insert(payload);
  }

  public delete(id: number): Promise<TPodcastFollover> {
    return this.#PodcastFollowerModel.query()
      .deleteById(id)
      .returning('*')
      .first();
  }
}

export { PodcastFollower };
