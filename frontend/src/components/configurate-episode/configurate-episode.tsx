import { useDispatch } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeCreatePayload } from 'common/types/types';

import { CreateEpisodeForm } from './components/components';

const ConfigurateEpisode: React.FC = () => {
  const dispatch = useDispatch();

  const handleCreateEpisode = (payload: EpisodeCreatePayload): void => {
    dispatch(configurateEpisodeActions.createEpisode(payload));
  };

  return (
    <div>
      <CreateEpisodeForm onSubmit={handleCreateEpisode}/>
    </div>
  );
};

export default ConfigurateEpisode;
