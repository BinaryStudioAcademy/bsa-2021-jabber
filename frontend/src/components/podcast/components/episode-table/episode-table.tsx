import { Table } from 'components/common/common';
import { Episode } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';
import { DEFAULT_EPISODE_PAGINATION } from 'components/podcast/common/constatnts/constants';

type Props = {
  episodes: Episode[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalEpisodesCount: number;
};

const EpisodeTable: React.FC<Props> = ({
  episodes,
  pageCount,
  currentPage,
  onPageChange,
  totalEpisodesCount,
}) => {
  const columns = getColumns();
  const rows = getRows(episodes);

  return <Table
    columns={columns}
    data={rows}
    pageCount={pageCount}
    currentPage={currentPage}
    onPageChange={onPageChange}
    totalRowsCount={totalEpisodesCount}
    defaultPaginationRows={DEFAULT_EPISODE_PAGINATION.row}
    hasPagination
  />;
};

export default EpisodeTable;
