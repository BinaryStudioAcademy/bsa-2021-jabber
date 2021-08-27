import {
  PodcastFollower as TPodcastFollower,
  PodcastFollowerPayload,
} from '~/common/types/types';
import { podcastFollower as podcastFollowerRep } from '~/data/repositories/repositories';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  podcastFollowerRepository: typeof podcastFollowerRep;
};

class PodcastFollower {
  #podcastFollowerRepository: typeof podcastFollowerRep;

  constructor({ podcastFollowerRepository }: Constructor) {
    this.#podcastFollowerRepository = podcastFollowerRepository;
  }

  public getCountByPodcastId(podcastId: number): Promise<number> {
    return this.#podcastFollowerRepository.getCountByPodcastId(podcastId);
  }

  public async checkIsFollowed(payload: PodcastFollowerPayload): Promise<boolean> {
    const podcastFollower = await this.#podcastFollowerRepository.getByPodcastIdFollowerId(payload);

    return Boolean(podcastFollower);
  }

  public getAllByPodcastId(podcastId: number): Promise<TPodcastFollower[]> {
    return this.#podcastFollowerRepository.getAllByPodcastId(podcastId);
  }

  public async create(payload: PodcastFollowerPayload): Promise<TPodcastFollower> {
    const podcastFollower = await this.#podcastFollowerRepository.getByPodcastIdFollowerId(payload);

    if (podcastFollower) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.ALREADY_FOLLOWING,
      });
    }

    return this.#podcastFollowerRepository.create(payload);
  }

  public delete(payload: PodcastFollowerPayload): Promise<TPodcastFollower> {
    return this.#podcastFollowerRepository.delete(payload);
  }

  public async deleteAllByPodcastId(id: number): Promise<void> {
    await this.#podcastFollowerRepository.deleteAllByPodcastId(id);
  }
}

export { PodcastFollower };
