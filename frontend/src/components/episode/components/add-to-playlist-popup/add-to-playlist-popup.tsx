import { Popuper, Button, Link } from 'components/common/common';
import { Playlist } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/helpers';
import { sortPlaylistsByName } from './common/helpers/heplers';
import styles from './styles.module.scss';

type Props = {
  playlists: Playlist[];
  handleAddToPlaylist: (id: number) => void;
  triggerClassName: string;
};

const AddToPlaylistPopup: React.FC<Props> = ({ playlists, handleAddToPlaylist, triggerClassName }) => {

  const sortedPlaylists = sortPlaylistsByName(playlists);

  return (
    <Popuper
      trigger={
        <div className={triggerClassName}>
          <Button
            className={styles.triggerButton}
            label="Add to Playlist"
          />
        </div>
      }
      renderContent={(close): JSX.Element => (
        <div className={styles.dropDown}>
          <ul className={styles.dropDownList} onClick={close}>
            <li>
              <Link
                to={AppRoute.PLAYLISTS_EDIT}
                className={getAllowedClasses(styles.listButton, styles.createPlaylist)}
              >
                + Create Playlist
              </Link>
            </li>
            {sortedPlaylists.map(({ id, name }) => (
              <li key={id}>
                <button
                  className={styles.listButton}
                  onClick={(): void => handleAddToPlaylist(id)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>)}
    />
  );
};

export default AddToPlaylistPopup;
