import { Table } from 'components/common/common';
import { Episode } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  episodes: Episode[];
  handleSetRow: (row: number) => void;
  handleSetPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCountEpisodes: number;
};

const EpisodeTable: React.FC<Props> = ({
  episodes ,
  pageSize,
  handleSetRow,
  handleSetPage,
  pageIndex,
  totalCountEpisodes,
}) => {
  const columns = getColumns();
  const rows = getRows(episodes);

  return <Table
    columns={columns}
    data={rows}
    handleSetRow={handleSetRow}
    handleSetPage={handleSetPage}
    pageIndex={pageIndex}
    pageSize={pageSize}
    totalCountEpisodes={totalCountEpisodes}
  />;
};

export default EpisodeTable;
