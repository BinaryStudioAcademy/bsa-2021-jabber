import { Column } from 'react-table';
import { INCREASE_CONT_FOR_IDX } from 'common/constants/constants';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { EpisodeNameRow, PodcastNameRow } from '../types/types';

const getColumns = (): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): number => {
        return rowIndex + INCREASE_CONT_FOR_IDX;
      },
    },
    {
      Header: 'Name',
      accessor: (originalRow): Record<string, unknown> => {
        const row = originalRow as EpisodeNameRow;
        return {
          name: row.name,
          episodeId: row.episodeId,
        };
      },
      Cell: ({ value }): JSX.Element => (
        <Link to={`${AppRoute.EPISODES}/${value.episodeId}`}>{value.name}</Link>
      ),
    },
    {
      Header: 'Podcast',
      accessor: (originalRow): Record<string, unknown> => {
        const row = originalRow as PodcastNameRow;
        return {
          name: row.podcastName,
          podcastId: row.podcastId,
        };
      },
      Cell: ({ value }): JSX.Element => (
        <Link to={`${AppRoute.PODCASTS}/${value.podcastId}`}>{value.name}</Link>
      ),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
    },
  ];

  return columns;
};

export { getColumns };
