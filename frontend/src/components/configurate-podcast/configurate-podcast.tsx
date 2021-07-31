import { PodcastCreatePayload } from 'common/types/types';
import { podcast as podcastActions } from 'store/actions';
import { useDispatch } from 'hooks/hooks';
import { ConfiguratePodcastForm } from './components/components';

const ConfiguratePodcast: React.FC = () => {
  const dispatch = useDispatch();

  const handleCreatePodcast = (data: PodcastCreatePayload): void => {
    dispatch(podcastActions.create(data));
  };

  return <ConfiguratePodcastForm onSubmit={handleCreatePodcast} />;
};

export default ConfiguratePodcast;
