import styles from './styles.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <span className={styles.headerText}>404</span>
        <span className={styles.descriptionText}>Page not found</span>
      </div>
      <span className={styles.copyRight}>&copy; Jabber</span>
    </div>
  );
};

export default NotFound;
