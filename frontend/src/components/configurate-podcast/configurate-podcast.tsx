import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import {
  configuratePodcast as configuratePodcastActions,
  genre as genreAction,
} from 'store/actions';
import { PodcastFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';
import { mapPodcastToFormPayload, mapGenreToSelectOptions } from './helpers/helpers';
import { Loader } from 'components/common/common';
import { DataStatus } from 'common/enums/enums';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { podcast, dataStatus, genres } = useAppSelector(({ configuratePodcast, genre }) => ({
    podcast: configuratePodcast.podcast,
    dataStatus: configuratePodcast.dataStatus,
    genres: genre.genres,
  }));

  const isEdit = Boolean(id);

  const handleFormSubmit = (payload: PodcastFormPayload): void => {
    isEdit
      ? dispatch(configuratePodcastActions.edit(payload))
      : dispatch(configuratePodcastActions.create(payload));
  };

  const mappedPodcast = podcast ? mapPodcastToFormPayload(podcast) : undefined;
  const mappedGenres = genres ? mapGenreToSelectOptions(genres) : [];

  useEffect(() => {
    dispatch(genreAction.loadGenres());
    if (isEdit) {
      dispatch(configuratePodcastActions.loadPodcast(Number(id)));
    }
  }, []);

  return (
    <div className={styles.podcast}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Podcast {id ?? ''}
      </h2>
      {dataStatus === DataStatus.PENDING ? (
        <Loader />
      ) : (
        <ConfiguratePodcastForm
          onSubmit={handleFormSubmit}
          payload={mappedPodcast}
          genres={mappedGenres}
        />
      )}
    </div>
  );
};

export default ConfiguratePodcast;
