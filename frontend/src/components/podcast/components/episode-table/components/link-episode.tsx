import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  name: string;
  idEpisode: string;
  isLive: boolean;
};

const LinkEpisode: React.FC<Props> = ({ name, idEpisode, isLive  }) => (
  <Link to={`${AppRoute.EPISODES}/${idEpisode}`}>
    <span className={ isLive ? styles.live : ''}>{name}</span>
  </Link>
);

export default LinkEpisode;
