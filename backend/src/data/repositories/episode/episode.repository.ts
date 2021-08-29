import { EpisodeModel as EpisodeM } from '~/data/models/models';
import {
  Episode as TEpisode,
  EpisodeCreateDTOPayload,
  EpisodeEditDTOPayload,
  LoadEpisodesByPodcastIdPayload,
} from '~/common/types/types';

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
}

export { Episode };
