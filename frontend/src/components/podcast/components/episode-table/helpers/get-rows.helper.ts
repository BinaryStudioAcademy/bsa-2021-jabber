import { Episode } from 'common/types/types';

const getRows = (episodes: Episode[]): Record<string, string>[] => {
  const rows = episodes.map((episode) => ({
    name: episode.name,
    description: episode.description,
  }));

  return rows;
};

export { getRows };
