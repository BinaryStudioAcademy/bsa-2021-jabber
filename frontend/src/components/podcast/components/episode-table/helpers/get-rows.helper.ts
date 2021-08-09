import { Episode } from 'common/types/types';
import { format } from 'hooks/hooks';

const getRows = (episodes: Episode[]): Record<string, string>[] => {
  const rows = episodes.map((episode) => ({
    name: episode.name,
    description: episode.description,
    createdAt: format(new Date(episode.createdAt), 'dd/MM/yyyy'),
  }));

  return rows;
};

export { getRows };
