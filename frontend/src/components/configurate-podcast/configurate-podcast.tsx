import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';
import { mapPodcastToFormPayload } from 'helpers/helpers';
import { Loader } from 'components/common/common';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { podcast, dataStatus } = useAppSelector(({ configuratePodcast }) => ({
    podcast: configuratePodcast.podcast,
    dataStatus: configuratePodcast.dataStatus,
  }));

  const isEdit = Boolean(id);

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
      {(dataStatus === 'pending')
        ? <Loader />
        : <ConfiguratePodcastForm onSubmit={handleFormSubmit} payload={mapPodcast}/>}
    </div>
  );
};

export default ConfiguratePodcast;
