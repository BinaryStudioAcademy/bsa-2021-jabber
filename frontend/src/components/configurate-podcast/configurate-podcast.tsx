import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { Podcast, PodcastCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
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
      {(isEdit)
        ? podcast && <ConfiguratePodcastForm
          onSubmit={handleFormSubmit}
          payload={mapPodcastToFormPayload(podcast)}/>
        : <ConfiguratePodcastForm onSubmit={handleFormSubmit}/>
      }
    </div>
  );
};

export default ConfiguratePodcast;
