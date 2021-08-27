import { AppRoute } from 'common/enums/enums';
import { ImageWrapper, Link } from 'components/common/common';
import { UserFollower } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  follower: UserFollower;
};

const FollowerItem: React.FC<Props> = ({ follower }) => {

  return (
    <li className={styles.followerItem}>
      <Link className={styles.link}
        to={`${AppRoute.USERS}/${follower.follower.id}`}
      >
        <ImageWrapper
          width="195"
          height="195"
          loading="lazy"
          label={follower.follower.nickname}
          src={follower.follower.image?.url}
          className={styles.imageWrapper}
        />
        <div className={styles.userName}>
          {follower.follower.firstName}
        </div>
      </Link>
    </li>
  );
};

export default FollowerItem;
