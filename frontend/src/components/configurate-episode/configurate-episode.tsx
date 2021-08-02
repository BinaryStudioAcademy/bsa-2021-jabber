import { useDispatch, useParams } from 'hooks/hooks';
import { episode as episodeActions } from 'store/actions';
import { EpisodeCreatePayload } from 'common/types/types';

import { PageParams } from './common/types/types';
import { CreateEpisodeForm } from './components/components';

const ConfigurateEpisode: React.FC = () => {
  const { episodeId } = useParams<PageParams>();
  const dispatch = useDispatch();

  const isEdit = Boolean(episodeId);

  const handleCreateEpisode = (payload: EpisodeCreatePayload): void => {
    dispatch(episodeActions.createEpisode(payload));
  };

  return (
    <div>
      {isEdit ?
        null
        : <CreateEpisodeForm onSubmit={handleCreateEpisode}/>};
    </div>
  );
};

export default ConfigurateEpisode;
