import { Table } from 'components/common/common';
import { EpisodeWithPodcast } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';
import { DEFAULT_EPISODE_PAGINATION } from 'components/user-profile/common/constants/constants';

type Props = {
  episodes: EpisodeWithPodcast[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalFavoriteCount: number;
};

const FavouriteEpisodeTable: React.FC<Props> = ({
  episodes,
  pageCount,
  currentPage,
  onPageChange,
  totalFavoriteCount,
}) => {
  const columns = getColumns();
  const rows = getRows(episodes);

  return <Table
    columns={columns}
    data={rows}
    defaultPaginationRows={DEFAULT_EPISODE_PAGINATION.row}
    pageCount={pageCount}
    currentPage={currentPage}
    onPageChange={onPageChange}
    totalRowsCount={totalFavoriteCount}
  />;
};

export default FavouriteEpisodeTable;
