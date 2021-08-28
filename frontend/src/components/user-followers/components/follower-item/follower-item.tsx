import { AppRoute } from 'common/enums/enums';
import { ImageWrapper, Link } from 'components/common/common';
import { User } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  follower: User;
};

const FollowerItem: React.FC<Props> = ({ follower }) => {

  return (
    <li className={styles.followerItem}>
      <Link className={styles.link}
        to={`${AppRoute.USERS}/${follower.id}`}
      >
        <ImageWrapper
          width="195"
          height="195"
          loading="lazy"
          label={follower.nickname}
          src={follower.image?.url}
          className={styles.imageWrapper}
        />
        <div className={styles.userName}>
          {follower.firstName}
        </div>
      </Link>
    </li>
  );
};

export default FollowerItem;
