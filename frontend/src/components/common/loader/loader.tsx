import styles from './styles.module.scss';
import spinner from 'assets/img/spinner.svg';

type Props = {
  size?: 'small' | 'medium' | 'large';
};

const Loader: React.FC<Props> = ({ size = 'medium' }) => (
  <div className={styles.loaderOverlay}>
    <img
      className={styles.loaderImage}
      alt="spinner"
      src={spinner}
      width={size === 'large' ? 50 : size === 'medium' ? 35 : 25}
    />
  </div>
);

export default Loader;
