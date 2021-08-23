
import { User } from 'common/types/types';
import { PopularUser } from './common/components/components';
import styles from './styles.module.scss';

type Props = {
  popularUsers: User[],
};

const PopularUsers: React.FC<Props> = ({ popularUsers }: Props) => {

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Popular podcaster</h2>
      <div className={styles.usersRow}>
        {popularUsers.map((user) => (
          <PopularUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default PopularUsers;
