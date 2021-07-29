import { IconName } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  iconName: IconName;
};

const Icon: React.FC<Props> = ({ iconName }) => (
  <div className={`${styles.icon}  ${styles[iconName]}`}></div>
);

export default Icon;
