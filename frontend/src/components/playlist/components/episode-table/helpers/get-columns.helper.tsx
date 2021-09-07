import { Column } from 'react-table';
import { INCREASE_CONT_FOR_IDX } from 'common/constants/constants';
import { Link } from 'components/common/common';
import { ActionCell } from '../components/components';
import { AppRoute } from 'common/enums/enums';
import { EpisodeNameRow } from '../types/types';

type HandleDeleteEpisode = (id: number) => void;

const getColumns = (handleDeleteEpisode: HandleDeleteEpisode, isAllowDelete: boolean): Column[] => {

  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): number => {
        return rowIndex + INCREASE_CONT_FOR_IDX;
      },
    },
    {
      Header: 'Episode name',
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
      Header: 'Podcast name',
      accessor: 'podcastName',
    },
    {
      Header: 'CreatedAt',
      accessor: 'createdAt',
    },
  ];

  if (isAllowDelete) {
    columns.push({
      Header: 'Actions',
      accessor: (originalRow): Record<string, unknown> => {
        const row = originalRow as EpisodeNameRow;
        return {
          episodeId: row.episodeId,
        };
      },
      Cell: ({ value }): JSX.Element => (
        <ActionCell
          value={value}
          onDeleteEpisode={handleDeleteEpisode}
        />
      ),
    });
  }

  return columns;
};

export { getColumns };
