import { useDispatch, useParams, useAppSelector, useEffect } from 'hooks/hooks';
import {
  configuratePlaylist as configuratePlaylistActions,
} from 'store/actions';
import { PlaylistFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { DataStatus } from 'common/enums/enums';
import { mapPlaylistToFormPayload } from './helpers/helpers';
import { ConfiguratePlaylistForm } from './components/components';
import { Loader } from 'components/common/common';
import styles from './styles.module.scss';

const ConfiguratePlaylist: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const {
    playlist,
    dataStatus,
  } = useAppSelector(({ configuratePlaylist }) => ({
    playlist: configuratePlaylist.playlist,
    dataStatus: configuratePlaylist.dataStatus,
  }));

  const isEdit = Boolean(id);
  const isLoading = dataStatus === DataStatus.PENDING;

  const handleFormSubmit = (payload: PlaylistFormPayload): void => {
    isEdit
      ? dispatch(configuratePlaylistActions.edit(payload))
      : dispatch(configuratePlaylistActions.create(payload));
  };

  const mappedPlaylist = playlist ? mapPlaylistToFormPayload(playlist) : undefined;

  useEffect(() => {
    dispatch(isEdit
      ? configuratePlaylistActions.loadPlaylist(Number(id))
      : configuratePlaylistActions.resetState());

    return (): void => {
      dispatch(configuratePlaylistActions.resetState());
    };
  }, [isEdit]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.playlist}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          {isEdit ? 'Edit' : 'Create'} Playlist
        </h1>
        <ConfiguratePlaylistForm
          onSubmit={handleFormSubmit}
          payload={mappedPlaylist}
          isEdit={isEdit}
        />
      </div>
    </main>
  );
};

export default ConfiguratePlaylist;
