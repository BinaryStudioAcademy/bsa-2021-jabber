import { Podcast as TPodcast } from 'common/types/types';
import { PodcastItem, Button } from 'components/common/common';
import { ButtonColor } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  podcasts: TPodcast[];
  onMorePodcastsLoad?: () => void;
};

const PodcastsList: React.FC<Props> = ({ podcasts, onMorePodcastsLoad }) => (
  <>
    <ul className={styles.list}>
      {podcasts.map((it) => (
        <PodcastItem podcast={it} key={it.id} />
      ))}
    </ul>
    {onMorePodcastsLoad && <div className={styles.loadMoreBtn}>
      <Button label="See more" buttonColor={ButtonColor.LIGHT_PINK} onClick={onMorePodcastsLoad}/>
    </div>}
  </>
);

export default PodcastsList;
