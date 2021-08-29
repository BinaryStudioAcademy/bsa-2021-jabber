import {
  PodcastFollower as TPodcastFollower,
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

  public getCountByPodcastId(podcastId: number): Promise<number> {
    return this.#PodcastFollowerModel.query()
      .where('podcast_id', podcastId)
      .resultSize();
  }

  public getAllByPodcastId(podcastId: number): Promise<TPodcastFollower[]> {
    return this.#PodcastFollowerModel.query()
      .where('podcast_id', podcastId);
  }

  public getByPodcastIdFollowerId({ podcastId, followerId }: PodcastFollowerPayload): Promise<TPodcastFollower> {
    return this.#PodcastFollowerModel.query()
      .findOne({
        'podcast_id': podcastId,
        'follower_id': followerId,
      });
  }

  public create(payload: PodcastFollowerPayload): Promise<TPodcastFollower> {
    return this.#PodcastFollowerModel.query().insert(payload);
  }

  public delete({ podcastId, followerId }: PodcastFollowerPayload): Promise<TPodcastFollower> {
    return this.#PodcastFollowerModel.query()
      .delete()
      .where('podcast_id', podcastId)
      .where('follower_id', followerId)
      .returning('*')
      .first();
  }

  public deleteAllByPodcastId(id: number): Promise<TPodcastFollower[]> {
    return this.#PodcastFollowerModel.query()
      .delete()
      .where('podcast_id', id)
      .returning('*');
  }
}

export { PodcastFollower };
