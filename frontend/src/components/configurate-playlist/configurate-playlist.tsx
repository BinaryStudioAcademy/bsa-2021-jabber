import { useDispatch } from 'hooks/hooks';
import {
  configuratePlaylist as configuratePlaylistActions,
} from 'store/actions';
import { PlaylistFormPayload } from 'common/types/types';
import { ConfiguratePlaylistForm } from './components/components';
import styles from './styles.module.scss';

const ConfiguratePlaylist: React.FC = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (payload: PlaylistFormPayload): void => {
    dispatch(configuratePlaylistActions.create(payload));
  };

  return (
    <main className={styles.playlist}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Create playlist
        </h1>
        <ConfiguratePlaylistForm
          onSubmit={handleFormSubmit}
        />
      </div>
    </main>
  );
};

export default ConfiguratePlaylist;
