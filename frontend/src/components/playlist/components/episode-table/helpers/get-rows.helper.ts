import { EpisodeWithPodcast } from 'common/types/types';
import { formatDate } from './get-formatted-date';

const getRows = (episodes: EpisodeWithPodcast[]): Record<string, string | undefined >[] => {
  const rows = episodes.map((episode) => ({
    name: episode.name,
    description: episode.description,
    createdAt: formatDate(new Date(episode.createdAt)),
    episodeId: String(episode.id),
    podcastName: String(episode.podcast.name),
  }));

  return rows;
};

export { getRows };
