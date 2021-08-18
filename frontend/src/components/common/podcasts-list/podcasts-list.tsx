import { Podcast as TPodcast } from 'common/types/types';
import { PodcastItem, Button } from 'components/common/common';
import { ButtonColor } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  podcasts: TPodcast[];
  isLoading?: boolean;
  onMorePodcastsLoad?: () => void;
};

const PodcastsList: React.FC<Props> = ({ podcasts, onMorePodcastsLoad, isLoading }) => (
  <>
    <ul className={styles.list}>
      {podcasts.map((it) => (
        <PodcastItem podcast={it} key={it.id} />
      ))}
    </ul>
    {onMorePodcastsLoad && !isLoading && <Button className={styles.loadMoreBtn} label="See more" buttonColor={ButtonColor.LIGHT_PINK} onClick={onMorePodcastsLoad}/>}
  </>
);

export default PodcastsList;
