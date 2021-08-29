import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import {
  configurateEpisode as configurateEpisodeActions,
  record as recordActions,
} from 'store/actions';
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

  const { episode, dataStatus, hasLiveRecord } = useAppSelector(
    ({ configurateEpisode, record }) => ({
      episode: configurateEpisode.episode,
      dataStatus: configurateEpisode.dataStatus,
      hasLiveRecord: record.hasLiveRecord,
    }),
  );

  const mapEpisode = episode ? mapEpisodeToFormPayload(episode) : undefined;

  const isEdit = Boolean(id);

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleFormSubmit = (payload: EpisodeFormPayload): void => {
    isEdit
      ? dispatch(configurateEpisodeActions.edit(payload))
      : dispatch(
        configurateEpisodeActions.create({
          ...payload,
          podcastId: Number(podcastId),
        }),
      );
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(configurateEpisodeActions.loadEpisode(Number(id)));
    }

    return (): void => {
      dispatch(configurateEpisodeActions.resetState());
    };
  }, []);

  useEffect(() => {
    if (hasLiveRecord) {
      return (): void => {
        dispatch(recordActions.resetState());
      };
    }
  }, [hasLiveRecord]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.episode}>
      <div className={styles.wrapper}>
        <h1 className={styles.episodeTitle}>
          {isEdit ? 'Edit' : 'Create'} episode
        </h1>
        <CreateEpisodeForm
          imageUrl={episode?.image?.url}
          fileUrl={episode?.record?.fileUrl}
          onSubmit={handleFormSubmit}
          payload={mapEpisode}
        />
      </div>
    </main>
  );
};

export default ConfigurateEpisode;
