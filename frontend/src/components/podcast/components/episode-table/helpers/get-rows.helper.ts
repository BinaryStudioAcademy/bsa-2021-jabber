import { Episode } from 'common/types/types';
import { formatDate } from './get-formatted-date';

const getRows = (episodes: Episode[]): Record<string, string>[] => {
  const rows = episodes.map((episode) => ({
    name: episode.name,
    description: episode.description,
    createdAt: formatDate(new Date(episode.createdAt)),
  }));

  return rows;
};

export { getRows };
