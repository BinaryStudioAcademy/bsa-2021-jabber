import { Table } from 'components/common/common';
import { Episode } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  episodes: Episode[];
};

const EpisodeTable: React.FC<Props> = ({ episodes }) => {
  const columns = getColumns();
  const rows = getRows(episodes);

  return <Table columns={columns} data={rows} />;
};

export default EpisodeTable;
