import { Column } from 'react-table';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { EpisodeNameRow } from '../types/types';
import { getNumberingRows } from 'helpers/helpers';

const getColumns = (rowsCount: number, currentPage: number): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): number => {
        return getNumberingRows(rowIndex, rowsCount, currentPage);
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
      Header: 'Created At',
      accessor: 'createdAt',
    },
  ];

  return columns;
};

export { getColumns };
