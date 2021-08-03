import { useDispatch, useParams, useEffect, useAppSelector, useState } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { Podcast, PodcastCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { getDataUrl } from 'helpers/helpers';
import {
  ConfiguratePodcastForm,
  ConfiguratePodcastImage,
} from './components/components';
import styles from './styles.module.scss';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { podcast } = useAppSelector(({ configuratePodcast }) => ({
    podcast: configuratePodcast.podcast,
  }));

  const isEdit = Boolean(id);

  const handleFormSubmit = (payload: PodcastCreatePayload): void => {
    isEdit ? dispatch(configuratePodcastActions.edit(payload)) : dispatch(configuratePodcastActions.create(payload));
  };
  const [imageSrc, setImageSrc] = useState('');

  const handleCreateCover = async (file: File): Promise<void> => {
    setImageSrc(await getDataUrl(file));
  };

  const mapPodcastToFormPayload = (podcast: Podcast): PodcastCreatePayload => ({
    name: podcast.name,
    description: podcast.description,
    userId: podcast.userId,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(configuratePodcastActions.loadPodcast(Number(id)));
    }
  }, []);

  return (
    <div className={styles.podcast}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Podcast {id ?? ''}
      </h2>
      <div className={styles.forms}>
        <div className={styles.formLeft}>
          {(isEdit)
            ? podcast && <ConfiguratePodcastForm
              onSubmit={handleFormSubmit}
              payload={mapPodcastToFormPayload(podcast)}/>
            : <ConfiguratePodcastForm onSubmit={handleFormSubmit}/>
          }
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
