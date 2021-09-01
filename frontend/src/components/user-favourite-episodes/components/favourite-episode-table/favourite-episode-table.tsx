import { Table } from 'components/common/common';
import { EpisodeWithPodcast } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  episodes: EpisodeWithPodcast[];
};

const FavouriteEpisodeTable: React.FC<Props> = ({
  episodes,
}) => {
  const columns = getColumns();
  const rows = getRows(episodes);

  return <Table
    columns={columns}
    data={rows}
  />;
};

export default FavouriteEpisodeTable;
