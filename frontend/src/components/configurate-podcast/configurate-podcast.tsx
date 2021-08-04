import { useDispatch, useParams } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const isEdit = Boolean(id);

  const handleSubmit = (payload: PodcastFormPayload): void => {
    dispatch(configuratePodcastActions.create(payload));
  };

  return (
    <div className={styles.podcast}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Podcast {id ?? ''}
      </h2>
      <ConfiguratePodcastForm onSubmit={handleSubmit} />;
    </div>
  );
};

export default ConfiguratePodcast;
