import { User } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { ImageWrapper, Link } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  user: User;
};

const PopularUser: React.FC<Props> = ({ user }: Props) => {

  return (
    <li className={styles.root}>
      <Link className={styles.link}
        to={`${AppRoute.USERS}/${user.id}`}
      >
        <ImageWrapper
          width="195"
          height="195"
          loading="lazy"
          label={user?.firstName}
          src={user.image?.url}
          className={styles.imageWrapper}
        />
        <div className={styles.userName}>
          {user.firstName}
          {' '}
          {user.lastName}
        </div>
      </Link>
    </li>
  );
};

export default PopularUser;
