import { PodcastCreatePayload } from 'common/types/types';
import { podcast as podcastActions } from 'store/actions';
import { useDispatch } from 'hooks/hooks';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';
import logoCut from 'assets/img/logo-cut.svg';

const ConfiguratePodcast: React.FC = () => {
  const dispatch = useDispatch();

  const handleCreatePodcast = (payload: PodcastCreatePayload): void => {
    dispatch(podcastActions.create(payload));
  };

  return (
    <div className={styles.podcast}>
      <div className={styles.podcastForm}>
        <ConfiguratePodcastForm onSubmit={handleCreatePodcast} />;
      </div>
      <div>
        <img src={logoCut} width="320" height="195" loading="lazy" alt="" />
      </div>
    </div>
  );
};

export default ConfiguratePodcast;
