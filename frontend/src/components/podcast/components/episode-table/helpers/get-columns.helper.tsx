import { Column } from 'react-table';
import LinkEpisode  from '../components/link-episode';
import { EpisodeStatus } from 'common/enums/enums';
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
        const isLive = row.status === EpisodeStatus.LIVE;
        return {
          name: row.name,
          episodeId: row.episodeId,
          isLive,
        };
      },
      Cell: ({ value }): JSX.Element => (
        <LinkEpisode name={value.name} idEpisode={value.episodeId} isLive={value.isLive} />
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
