import { useDispatch } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeFormPayload } from 'common/types/types';
import { CreateEpisodeForm } from './components/components';

const ConfigurateEpisode: React.FC = () => {
  const dispatch = useDispatch();

  const handleCreateEpisode = (payload: EpisodeFormPayload): void => {
    dispatch(configurateEpisodeActions.createEpisode(payload));
  };

  return <CreateEpisodeForm onSubmit={handleCreateEpisode} />;
};

export default ConfigurateEpisode;
