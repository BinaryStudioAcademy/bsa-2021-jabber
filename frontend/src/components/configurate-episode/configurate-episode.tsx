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

  const { episode, dataStatus,  liveRecordDataUrl } = useAppSelector(
    ({ configurateEpisode, record }) => ({
      episode: configurateEpisode.episode,
      dataStatus: configurateEpisode.dataStatus,
      liveRecordDataUrl: record.liveRecordDataUrl,
    }),
  );

  const mapEpisode = episode ? mapEpisodeToFormPayload(episode) : undefined;

  if (liveRecordDataUrl && mapEpisode) {
    mapEpisode.recordDataUrl = liveRecordDataUrl;
  }

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
    if (liveRecordDataUrl) {
      return (): void => {
        dispatch(recordActions.resetState());
      };
    }
  }, [liveRecordDataUrl]);

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
          onSubmit={handleFormSubmit}
          payload={mapEpisode}
        />
      </div>
    </main>
  );
};

export default ConfigurateEpisode;
