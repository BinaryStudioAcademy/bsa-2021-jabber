import { EpisodeWithPodcast } from 'common/types/types';
import { formatDate } from '../helpers';

const getRows = (episodes: EpisodeWithPodcast[]): Record<string, string>[] => {
  const rows = episodes.map((episode) => ({
    name: episode.name,
    description: episode.description,
    podcastId: String(episode.podcastId),
    createdAt: formatDate(new Date(episode.createdAt)),
    episodeId: String(episode.id),
    podcastName: episode.podcast.name,
  }));

  return rows;
};

export { getRows };
