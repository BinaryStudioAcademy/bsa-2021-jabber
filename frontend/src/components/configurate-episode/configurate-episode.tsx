import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeFormPayload } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';
import { mapEpisodeToFormPayload } from './helpers/helpers';
import { Loader } from 'components/common/common';
import { CreateEpisodeForm } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const ConfigurateEpisode: React.FC = () => {
  const { id, podcastId } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { episode, dataStatus } = useAppSelector(({ configurateEpisode }) => ({
    episode: configurateEpisode.episode,
    dataStatus: configurateEpisode.dataStatus,
  }));

  const mapEpisode = episode ? mapEpisodeToFormPayload(episode) : undefined;

  const isEdit = Boolean(id);

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleFormSubmit = (payload: EpisodeFormPayload): void => {
    isEdit
      ? dispatch(configurateEpisodeActions.edit(payload))
      : dispatch(configurateEpisodeActions.create({
        ...payload,
        podcastId: Number(podcastId),
      }));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(configurateEpisodeActions.loadEpisode(Number(id)));
    }
  }, []);

  return (
    <main className={styles.episode}>
      <h1 className={styles.episodeTitle}>
        {isEdit ? 'Edit' : 'Create'} episode
      </h1>
      {isLoading
        ? <Loader />
        : <CreateEpisodeForm
          onSubmit={handleFormSubmit}
          payload={mapEpisode} />
      }
    </main>
  );
};

export default ConfigurateEpisode;
