import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
  UserPodcastQueryParams,
  PodcastLoadFilter,
} from '~/common/types/types';
import { PodcastType } from '~/common/enums/enums';
import { PODCAST_LOAD_LIMIT } from '~/common/constants/constants';
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
    return this.#PodcastModel
      .query()
      .where('type', PodcastType.PUBLIC)
      .withGraphJoined('[image, user]');
  }

  public getPodcastsCount({ search }: PodcastLoadFilter): Promise<number> {
    return this.#PodcastModel
      .query()
      .where('type', PodcastType.PUBLIC)
      .whereRaw(`REPLACE(name, ' ', '') ILIKE REPLACE('%${search}%', ' ', '')`)
      .resultSize();
  }

  public getByQuery({ offset = 0, limit = PODCAST_LOAD_LIMIT, search = '', genres = [] }: PodcastLoadFilter): Promise<TPodcast[]> {
    return this.#PodcastModel
      .query()
      .where('type', PodcastType.PUBLIC)
      .filterByGenres(genres)
      .filterBySearch(search)
      .limit(limit)
      .offset(offset)
      .withGraphJoined('[image, user]');
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
      .withGraphJoined('[image, cover, user, genre]');
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
      .withGraphJoined('[image, user]');
  }

  public delete(id: number): Promise<TPodcast> {
    return this.#PodcastModel.query().deleteById(id).returning('*').first();
  }
}

export { Podcast };
