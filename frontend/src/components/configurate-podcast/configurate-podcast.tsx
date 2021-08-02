import { useDispatch, useParams } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import {
  ConfiguratePodcastForm,
  ConfiguratePodcastImage,
} from './components/components';
import styles from './styles.module.scss';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const isEdit = Boolean(id);

  const handleCreatePodcast = (payload: PodcastCreatePayload): void => {
    dispatch(configuratePodcastActions.create(payload));
  };

  const handleCreateCover = (file: File): void => {
    dispatch(configuratePodcastActions.createCover(file));
  };

  return (
    <div className={styles.podcast}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Podcast {id ?? ''}
      </h2>
      <div className={styles.forms}>
        <div className={styles.formLeft}>
          <ConfiguratePodcastForm onSubmit={handleCreatePodcast} />;
        </div>
        <div className={styles.formRight}>
          <ConfiguratePodcastImage onSubmit={handleCreateCover} />
        </div>
      </div>
    </div>
  );
};

export default ConfiguratePodcast;
