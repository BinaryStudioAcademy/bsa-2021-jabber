import { Popuper, Link } from 'components/common/common';
import { PopupItem } from './components/components';
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
        <button
          className={triggerClassName}
          title={'Add to playlist'}
        ></button>
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
            {sortedPlaylists.map((playlist) => (
              <PopupItem
                key={playlist.id}
                playlist={playlist}
                onAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </ul>
        </div>)}
    />
  );
};

export default AddToPlaylistPopup;
