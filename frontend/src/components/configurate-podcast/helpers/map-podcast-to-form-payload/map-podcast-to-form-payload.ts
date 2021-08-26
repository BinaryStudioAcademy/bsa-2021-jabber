import { Podcast, PodcastFormPayload } from 'common/types/types';

const mapPodcastToFormPayload = (podcast: Podcast): PodcastFormPayload => ({
  name: podcast.name,
  description: podcast.description,
  image: null,
  cover: null,
  type: podcast.type,
  genre: podcast.genreId?.toString() ?? null,
  periodicity: podcast.periodicity,
  invitationCode: '',
});

export { mapPodcastToFormPayload };
