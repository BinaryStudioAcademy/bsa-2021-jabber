import { useDispatch, useParams, useState } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { datauri } from 'services/services';
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
    dispatch(
      configuratePodcastActions.create({ ...payload, imgDataUrl: imageSrc }),
    );
  };

  const [imageSrc, setImageSrc] = useState('');

  const handleCreateCover = async (file: File): Promise<void> => {
    setImageSrc(await datauri.getDatauri(file));
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
          <ConfiguratePodcastImage
            onSubmit={handleCreateCover}
            imageSrc={imageSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfiguratePodcast;
