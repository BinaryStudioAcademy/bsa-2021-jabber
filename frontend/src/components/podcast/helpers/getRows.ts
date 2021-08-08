import { EpisodeTableKey } from 'common/enums/enums';
import { Episode } from 'common/types/types';

const getRows = (episodes: Episode[]): Record<string, string>[] => {
  const rows = episodes.map((episode) => ({
    [EpisodeTableKey.NAME]: episode.name,
    [EpisodeTableKey.DESCRIPTION]: episode.description,
  }));

  return rows;
};

export { getRows };
