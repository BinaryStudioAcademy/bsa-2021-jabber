import { Table } from 'components/common/common';
import { Episode } from 'common/types/types';
import { getColumns, getRows } from '../../helpers/helpers';
import { COLUMNS_SCHEME } from './common/constants';

type Props = {
  episodes: Episode[];
};

const EpisodeTable: React.FC<Props> = ({ episodes }) => {
  const columns = getColumns(COLUMNS_SCHEME);
  const rows = getRows(episodes);

  return <Table columns={columns} data={rows} />;
};

export default EpisodeTable;
