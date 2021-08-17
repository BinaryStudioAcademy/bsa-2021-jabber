import { Podcast as TPodcast } from 'common/types/types';
import { PodcastItem, Loader } from 'components/common/common';
import { DataStatus } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  podcasts: TPodcast[];
};

const PodcastsList: React.FC<Props> = ({ podcasts }) => {
  const { dataStatus } = useAppSelector(({ homepage }) => ({
    dataStatus: homepage.dataStatus,
  }));

  if (dataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <ul className={styles.list}>
      {podcasts.map((it) => {
        return <PodcastItem podcast={it} key={it.id} />;
      })}
    </ul>
  );
};

export default PodcastsList;
