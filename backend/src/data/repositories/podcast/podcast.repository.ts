import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
  UserPodcastQueryParams,
  PodcastLoadFilter,
} from '~/common/types/types';
import { EpisodeDTOKey, EpisodeStatus, PodcastType } from '~/common/enums/enums';
import { PODCAST_LOAD_LIMIT, POPULAR_PODCAST_LOAD_LIMIT } from '~/common/constants/constants';
import { PodcastModel as PodcastM } from '~/data/models/models';
import { EpisodeModel as EpisodeM } from '~/data/models/models';

type Constructor = {
  PodcastModel: typeof PodcastM;
  EpisodeModel: typeof EpisodeM;
};

class Podcast {
  #PodcastModel: typeof PodcastM;
  #EpisodeModel: typeof EpisodeM;

  constructor({ PodcastModel, EpisodeModel }: Constructor) {
    this.#PodcastModel = PodcastModel;
    this.#EpisodeModel = EpisodeModel;
  }

  public getAll(): Promise<TPodcast[]> {
    return this.#PodcastModel
      .query()
      .where('type', PodcastType.PUBLIC)
      .withGraphJoined('[image, user]')
      .omit(['password']);
  }

  public getPopular(): Promise<TPodcast[]> {
    return this.#PodcastModel.query()
      .where('podcasts.type', PodcastType.PUBLIC)
      .withGraphJoined('[image, user, episodes]')
      .select(
        'episodes.*',
        this.#EpisodeModel
          .relatedQuery('comments')
          .count()
          .as('commentsCount'),
      ).where(EpisodeDTOKey.STATUS, '=', EpisodeStatus.PUBLISHED)
      .orderBy('commentsCount', 'DESC')
      .omit(['commentsCount'])
      .limit(POPULAR_PODCAST_LOAD_LIMIT);
  }

  public async getPodcastsPagesCount({ search = '', genres = [] }: PodcastLoadFilter): Promise<number> {
    const podcastsCount = await this.#PodcastModel
      .query()
      .where('type', PodcastType.PUBLIC)
      .filterByGenres(genres)
      .filterBySearch(search)
      .resultSize();

    return Math.ceil(podcastsCount / PODCAST_LOAD_LIMIT);
  }

  public getByQuery({ page = 0, search = '', genres = [] }: PodcastLoadFilter): Promise<TPodcast[]> {
    const offset = page * PODCAST_LOAD_LIMIT;
    return this.#PodcastModel
      .query()
      .where('type', PodcastType.PUBLIC)
      .filterByGenres(genres)
      .filterBySearch(search)
      .limit(PODCAST_LOAD_LIMIT)
      .offset(offset)
      .withGraphJoined('[image, user]')
      .omit(['password']);
  }

  public create(payload: PodcastCreateDTOPayload): Promise<TPodcast> {
    return this.#PodcastModel
      .query()
      .insert(payload)
      .withGraphFetched('[image, cover]');
  }

  public getById(id: number): Promise<TPodcast> {
    return this.#PodcastModel
      .query()
      .findById(id)
      .withGraphJoined('[image, cover, user, genre]')
      .omit(['password']);
  }

  public update(id: string, payload: PodcastEditDTOPayload): Promise<TPodcast> {
    return this.#PodcastModel.query().updateAndFetchById(id, payload);
  }

  public getAllByUserId(
    filterParams: UserPodcastQueryParams,
  ): Promise<TPodcast[]> {
    return this.#PodcastModel
      .query()
      .where(filterParams)
      .withGraphJoined('[image, user]')
      .omit(['password']);
  }

  public delete(id: number): Promise<TPodcast> {
    return this.#PodcastModel.query().deleteById(id).returning('*').first();
  }
}

export { Podcast };
