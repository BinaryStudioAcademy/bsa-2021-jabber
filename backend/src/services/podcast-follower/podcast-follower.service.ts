import {
  PodcastFollower as TPodcastFollower,
  PodcastFollowerPayload,
} from '~/common/types/types';
import { podcastFollower as podcastFollowerRep } from '~/data/repositories/repositories';

type Constructor = {
  podcastFollowerRepository: typeof podcastFollowerRep;
};

class PodcastFollower {
  #podcastFollowerRepository: typeof podcastFollowerRep;

  constructor({podcastFollowerRepository}: Constructor) {
    this.#podcastFollowerRepository = podcastFollowerRepository;
  }

  public async setFollow(podcastFollowerPayload: PodcastFollowerPayload): Promise<TPodcastFollower> {
    const podcastFollower = await this.#podcastFollowerRepository.getPodcastFollower(podcastFollowerPayload);

    return podcastFollower
      ? await this.#podcastFollowerRepository.delete(podcastFollower.id)
      : await this.#podcastFollowerRepository.create(podcastFollowerPayload)
  }
}

export { PodcastFollower };
