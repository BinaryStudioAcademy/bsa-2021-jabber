import { Podcast, PodcastFormPayload } from 'common/types/types';

const mapPodcastToFormPayload = (podcast: Podcast): PodcastFormPayload => ({
  name: podcast.name,
  description: podcast.description,
  image: null,
});

export { mapPodcastToFormPayload };
