import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';
import { mapPodcastToFormPayload, mapGenreToOptions } from './helpers/helpers';
import { Loader } from 'components/common/common';
import { DataStatus } from 'common/enums/enums';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const {
    podcast,
    dataStatus,
    genres,
    genresDataStatus,
    invitationCode,
  } = useAppSelector(({ configuratePodcast }) => ({
    podcast: configuratePodcast.podcast,
    dataStatus: configuratePodcast.dataStatus,
    genres: configuratePodcast.genres,
    genresDataStatus: configuratePodcast.genresDataStatus,
    invitationCode: configuratePodcast.invitationCode,
  }));

  const isEdit = Boolean(id);

  const isLoading = dataStatus === DataStatus.PENDING || genresDataStatus === DataStatus.PENDING;

  const handleFormSubmit = (payload: PodcastFormPayload): void => {
    isEdit
      ? dispatch(configuratePodcastActions.edit(payload))
      : dispatch(configuratePodcastActions.create(payload));
  };

  const mappedPodcast = podcast ? mapPodcastToFormPayload(podcast, invitationCode) : undefined;
  const mappedGenres = mapGenreToOptions(genres);

  useEffect(() => {
    dispatch(isEdit
      ? configuratePodcastActions.loadPodcast(Number(id))
      : configuratePodcastActions.resetState());
    dispatch(configuratePodcastActions.loadGenres());

    return (): void => {
      dispatch(configuratePodcastActions.resetState());
    };
  }, [isEdit]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.podcast}>
      <h2 className={styles.podcastTitle}>
        {isEdit ? 'Edit' : 'Create'} Podcast
      </h2>
      <ConfiguratePodcastForm
        onSubmit={handleFormSubmit}
        payload={mappedPodcast}
        genres={mappedGenres}
      />
    </div>
  );
};

export default ConfiguratePodcast;
