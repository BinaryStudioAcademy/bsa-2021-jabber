import { Column, Row } from 'react-table';
import { INCREASE_CONT_FOR_IDX, VALUE_LESS, VALUE_EQUAL, VALUE_GREATER } from 'common/constants/constants';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { EpisodeNameRow } from '../types/types';

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
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        if (rowA.values[id].name > rowB.values[id].name) {
          return VALUE_GREATER;
        }
        if (rowA.values[id].name < rowB.values[id].name) {
          return VALUE_LESS;
        }
        return VALUE_EQUAL;
      },
      Cell: ({ value }): JSX.Element => (
        <Link to={`${AppRoute.EPISODES}/${value.episodeId}`}>{value.name}</Link>
      ),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        const dateA = new Date(rowA.values[id]);
        const dateB = new Date(rowB.values[id]);
        if (dateA > dateB) {
          return VALUE_GREATER;
        }
        if (dateA < dateB) {
          return VALUE_LESS;
        }
        return VALUE_EQUAL;
      },
    },
  ];

  return columns;
};

export { getColumns };
