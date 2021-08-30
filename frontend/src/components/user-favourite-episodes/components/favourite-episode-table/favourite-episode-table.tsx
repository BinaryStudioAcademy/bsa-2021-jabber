import { Table } from 'components/common/common';
import { Episode } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  episodes: Episode[];
  onSetRow: (row: number) => void;
  onSetPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCountEpisodes: number;
};

const FavouriteEpisodeTable: React.FC<Props> = ({
  episodes ,
  pageSize,
  onSetRow,
  onSetPage,
  pageIndex,
  totalCountEpisodes,
}) => {
  const columns = getColumns();
  const rows = getRows(episodes);

  return <Table
    columns={columns}
    data={rows}
    onSetRow={onSetRow}
    onSetPage={onSetPage}
    pageIndex={pageIndex}
    pageSize={pageSize}
    totalCountItems={totalCountEpisodes}
    hasPagination
  />;
};

export default FavouriteEpisodeTable;
