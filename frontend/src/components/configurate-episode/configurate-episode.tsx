import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeFormPayload } from 'common/types/types';
import { DataStatus, ButtonType, ButtonColor } from 'common/enums/enums';
import { mapEpisodeToFormPayload } from './helpers/helpers';
import { Loader, Button } from 'components/common/common';
import { CreateEpisodeForm } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const ConfigurateEpisode: React.FC = () => {
  const { id, podcastId } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { episode, dataStatus, user } = useAppSelector(({ configurateEpisode, auth }) => ({
    episode: configurateEpisode.episode,
    dataStatus: configurateEpisode.dataStatus,
    user: auth.user,
  }));

  const mapEpisode = episode ? mapEpisodeToFormPayload(episode) : undefined;

  const isEdit = Boolean(id);
  const isEpisodeOwner = user?.id === episode?.userId; 

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleFormSubmit = (payload: EpisodeFormPayload): void => {
    isEdit
      ? dispatch(configurateEpisodeActions.edit(payload))
      : dispatch(configurateEpisodeActions.create({
        ...payload,
        podcastId: Number(podcastId),
      }));
  };

  const handleDeleteEpisode = (): void => {
    dispatch(configurateEpisodeActions.deleteEpisode({
      episodeId: Number(id),
      podcastId: Number(podcastId),
    }));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(configurateEpisodeActions.loadEpisode(Number(id)));
    }
  }, []);

  return (
    <div className={styles.episode}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Episode {episode?.name ?? ''}
      </h2>
      {isLoading ? (
        <Loader />
      ) : isEdit ? isEpisodeOwner ? (
        <>
          <CreateEpisodeForm onSubmit={handleFormSubmit} payload={mapEpisode} />
          <Button
            label="Delete"
            type={ButtonType.BUTTON}
            buttonColor={ButtonColor.LIGHT_NAVY}
            onClick={handleDeleteEpisode}
          />
        </>
      ) : 
        <div>Episode is not available!</div> 
        : <CreateEpisodeForm onSubmit={handleFormSubmit} payload={mapEpisode} />}
    </div>
  );
};

export default ConfigurateEpisode;
