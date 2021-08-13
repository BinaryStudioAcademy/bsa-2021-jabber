import { Podcast, PodcastFormPayload } from 'common/types/types';

const mapPodcastToFormPayload = (podcast: Podcast): PodcastFormPayload => ({
  name: podcast.name,
  description: podcast.description,
  image: null,
  cover: null,
  type: podcast.type,
});

export { mapPodcastToFormPayload };
