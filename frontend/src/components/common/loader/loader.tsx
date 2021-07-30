import styles from './styles.module.scss';

const Loader: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;
