import { useDispatch, useParams } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastCreatePayload } from 'common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<any>();
  const dispatch = useDispatch();

  const isEdit = Boolean(id);

  const handleCreatePodcast = (payload: PodcastCreatePayload): void => {
    dispatch(configuratePodcastActions.create(payload));
  };

  return (
    <div className={styles.podcast}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Podcast {id ?? ''}
      </h2>
      <ConfiguratePodcastForm onSubmit={handleCreatePodcast} />;
    </div>
  );
};

export default ConfiguratePodcast;
