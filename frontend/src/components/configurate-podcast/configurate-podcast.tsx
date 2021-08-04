import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { Podcast, PodcastFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { podcast, dataStatus } = useAppSelector(({ configuratePodcast }) => ({
    podcast: configuratePodcast.podcast,
    dataStatus: configuratePodcast.dataStatus,
  }));

  const isEdit = Boolean(id);

  const mapPodcastToFormPayload = (podcast: Podcast): PodcastFormPayload => ({
    name: podcast.name,
    description: podcast.description,
    image: null,
  });

  const handleFormSubmit = (payload: PodcastFormPayload): void => {
    isEdit
      ? dispatch(configuratePodcastActions.edit(payload))
      : dispatch(configuratePodcastActions.create(payload));
  };

  const mapPodcast = podcast ? mapPodcastToFormPayload(podcast) : undefined;

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
      {(!(dataStatus === 'pending')) && <ConfiguratePodcastForm onSubmit={handleFormSubmit} payload={mapPodcast}/>}
    </div>
  );
};

export default ConfiguratePodcast;
