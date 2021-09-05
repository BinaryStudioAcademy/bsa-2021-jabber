import { Column, Row } from 'react-table';
import { Link } from 'components/common/common';
import { AppRoute, EpisodeStatus } from 'common/enums/enums';
import { EpisodeNameRow } from '../types/types';
import { formatDate } from './get-formatted-date';
import { sortCallback } from './sort-callback.healper';
import { getNumberingRows } from 'helpers/helpers';
import styles from './styles.module.scss';

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
        const isLive = row.status === EpisodeStatus.LIVE;
        return {
          name: row.name,
          episodeId: row.episodeId,
          isLive,
        };
      },
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id].name, rowB.values[id].name);
      },
      Cell: ({ value }): JSX.Element => (
        <Link to={`${AppRoute.EPISODES}/${value.episodeId}`}>
          <span className={value.isLive && styles.live}>{value.name}</span>
        </Link>
      ),
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }): string => {
        return formatDate(new Date(value));
      },
    },
  ];

  return columns;
};

export { getColumns };
