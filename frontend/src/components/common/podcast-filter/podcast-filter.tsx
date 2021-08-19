import { Option } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  genres: Option[];
};

const PodcastFilter: React.FC<Props> = ({ genres }) => (
  <ul className={styles.categoriesList}>{genres.length + ' get'}</ul>
);

export default PodcastFilter;
