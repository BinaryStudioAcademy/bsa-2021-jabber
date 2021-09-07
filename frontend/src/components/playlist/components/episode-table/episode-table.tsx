import { Table } from 'components/common/common';
import { EpisodeWithPodcast } from 'common/types/types';
import { getColumns, getRows } from './helpers/helpers';

type Props = {
  episodes: EpisodeWithPodcast[];
  handleDeleteEpisode: (id: number) => void;
};

const EpisodeTable: React.FC<Props> = ({
  episodes,
  handleDeleteEpisode,
}) => {
  const columns = getColumns(handleDeleteEpisode);
  const rows = getRows(episodes);

  return <Table
    columns={columns}
    data={rows}
  />;
};

export default EpisodeTable;
