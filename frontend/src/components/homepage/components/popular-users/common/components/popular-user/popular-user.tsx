import { User } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { ImageWrapper, Link } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  user: User;
};

const PopularUser: React.FC<Props> = ({ user }: Props) => {

  return (
    <Link className={styles.root}
      to={`${AppRoute.USERS}/${user.id}`}
    >
      <ImageWrapper
        width="195"
        height="195"
        loading="lazy"
        src={user.image?.url}
        className={styles.imageWrapper}
      />
      <div className={styles.userName}>
        {user.firstName}
        {' '}
        {user.lastName}
      </div>
    </Link>
  );
};

export default PopularUser;
