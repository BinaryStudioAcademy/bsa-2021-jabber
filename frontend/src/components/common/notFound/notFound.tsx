import logo from '../../../assets/img/logo-cut.svg';
import styles from './styles.module.scss';

const NotFound: React.FC = () => {
  return (
    <div>
      <div className={styles.textWrapper}>
        <span className={styles.headerText}>404</span>
        <span className={styles.descriptionText}>Page not found</span>
      </div>
      <footer className={styles.copyRight}>
        <img
          src={logo}
          width="103"
          height="35"
          loading="lazy"
          alt=""
          className={styles.copyRight}
        />
      </footer>
    </div>
  );
};

export default NotFound;
