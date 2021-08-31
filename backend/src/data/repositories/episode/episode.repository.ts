import { EpisodeModel as EpisodeM } from '~/data/models/models';
import {
  Episode as TEpisode,
  EpisodeWithPodcast as TEpisodeWithPodcast,
  EpisodeCreateDTOPayload,
  EpisodeEditDTOPayload,
  LoadEpisodesByPodcastIdPayload,
  LoadFavouriteEpisodesPayload,
} from '~/common/types/types';
import { EpisodeType } from '~/common/enums/enums';

type Constructor = {
  EpisodeModel: typeof EpisodeM;
};

class Episode {
  #EpisodeModel: typeof EpisodeM;

  constructor({ EpisodeModel }: Constructor) {
    this.#EpisodeModel = EpisodeModel;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#EpisodeModel.query();
  }

  public getAllInRandomOrder(): Promise<TEpisode[]> {
    return this.#EpisodeModel.query().where('type', EpisodeType.PUBLIC).orderByRaw('random()');
  }

  public getById(id: number): Promise<TEpisode> {
    return this.#EpisodeModel.query().findById(id).withGraphJoined('[record, image, shownotes]');
  }

  public getAllByPodcastId(id: number): Promise<TEpisode[]> {
    return this.#EpisodeModel.query().where('podcast_id', id);
  }

  public getEpisodeCountByPodcastId(id: number): Promise<number> {
    return this.#EpisodeModel
      .query()
      .where('podcast_id', id)
      .resultSize();
  }

  public getByQueryByPodcastId({ podcastId, filter }: LoadEpisodesByPodcastIdPayload): Promise<TEpisode[]> {
    return this.#EpisodeModel.query()
      .where('podcast_id', podcastId)
      .limit(filter.limit)
      .offset(filter.offset);
  }

  public create(payload: EpisodeCreateDTOPayload): Promise<TEpisode> {
    return this.#EpisodeModel
      .query()
      .insert(payload)
      .withGraphFetched('[image, shownotes]');
  }

  public update(id: string, payload: EpisodeEditDTOPayload): Promise<TEpisode> {
    return this.#EpisodeModel
      .query()
      .updateAndFetchById(id, payload)
      .withGraphFetched('shownotes');
  }

  public delete(id: number): Promise<TEpisode> {
    return this.#EpisodeModel
      .query()
      .deleteById(id)
      .returning('*')
      .first();
  }

  public getFavouriteByQueryByUserId({ userId, filter }: LoadFavouriteEpisodesPayload): Promise<TEpisodeWithPodcast[]> {
    const { limit, offset } = filter;

    return this.#EpisodeModel
      .query()
      .withGraphJoined('[podcast]')
      .joinRelated('[favourites]')
      .where('favourites.user_id', userId)
      .limit(limit)
      .offset(offset);
  }

  public getFavouriteCountByUserId(id: number): Promise<number> {
    return this.#EpisodeModel
      .query()
      .joinRelated('[favourites]')
      .where('favourites.user_id', id)
      .resultSize();
  }
}

export { Episode };
