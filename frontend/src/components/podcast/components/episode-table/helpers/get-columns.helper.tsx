import { Column } from 'react-table';
import { INCREASE_CONT_FOR_IDX } from 'common/constants/constants';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';

type Row = {
  name: string,
  episodeId: string,
};

const getColumns = (): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): number => {
        return rowIndex + INCREASE_CONT_FOR_IDX;
      },
    },
    {
      Header: 'Name and Host',
      accessor: ( row: Row ): Record<string, unknown> => {
        return {
          name: row.name,
          episodeId: row.episodeId,
        };
      },
      Cell: function getLink({ value }): JSX.Element  {
        return (
          <Link to={`${AppRoute.EPISODES}/${value.episodeId}`} >{value.name}</Link>
        );
      },
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
    },
  ];

  return columns;
};

export { getColumns };
