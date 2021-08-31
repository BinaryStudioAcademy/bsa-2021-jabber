import { Table } from 'components/common/common';
import { EpisodeWithPodcast } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  episodes: EpisodeWithPodcast[];
  onSetRow: (row: number) => void;
  onSetPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  episodesTotalCount: number;
};

const FavouriteEpisodeTable: React.FC<Props> = ({
  episodes ,
  pageSize,
  onSetRow,
  onSetPage,
  pageIndex,
  episodesTotalCount,
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
    totalCountItems={episodesTotalCount}
    hasPagination
  />;
};

export default FavouriteEpisodeTable;
