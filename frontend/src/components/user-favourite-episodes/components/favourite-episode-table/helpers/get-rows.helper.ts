import { Episode, Podcast } from 'common/types/types';
import { formatDate } from './get-formatted-date';

const getRows = (episodes: Episode[]): Record<string, string >[] => {
  const rows = episodes.map((episode) => ({
    name: episode.name,
    description: episode.description,
    podcastId: String(episode.podcastId),
    createdAt: formatDate(new Date(episode.createdAt)),
    episodeId: String(episode.id),
    podcastName: (<Podcast>episode.podcast).name,
  }));

  return rows;
};

export { getRows };
