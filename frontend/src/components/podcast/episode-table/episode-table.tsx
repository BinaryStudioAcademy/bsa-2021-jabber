import { Table } from 'components/common/common';
import { EpisodeCreatePayloadKey } from 'common/enums/enums';
import { Podcast } from 'common/types/types';
import { getTableColumns } from 'helpers/helpers';

import { episode as episodeActions } from 'store/actions';
import { useEffect, useDispatch, useAppSelector } from 'hooks/hooks';

type Props = {
  podcast: Podcast;
};

const EpisodeTable: React.FC<Props> = ({ podcast }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(episodeActions.loadEpisodesByPodcastId(Number(podcast.id)));
  }, [podcast.id]);

  const { episodes } = useAppSelector(({ episode }) => ({
    episodes: episode.episodes,
  }));

  const columnsScheme = [
    {
      Header: 'Name and Host',
      accessor: EpisodeCreatePayloadKey.NAME,
    },
    {
      Header: 'Episode',
      accessor: EpisodeCreatePayloadKey.DESCRIPTION,
    },
  ];

  const columns = getTableColumns(columnsScheme);

  return <Table columns={columns} data={episodes ?? []} />;
};

export default EpisodeTable;
