import logo from 'assets/img/logo-cut.svg';
import styles from './styles.module.scss';

const NotFound: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.textWrapper}>
        <span className={styles.headerText}>404</span>
        <span className={styles.descriptionText}>Page not found</span>
      </h1>
      <p className={styles.copyRight}>
        <img
          src={logo}
          width="70"
          height="25"
          loading="lazy"
          alt="Jabber Logo"
          className={styles.copyRight}
        />
        {currentYear} &copy; Jabber
      </p>
    </div>
  );
};

export default NotFound;
