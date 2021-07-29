import styles from '../styles.module.scss';

const Podcast: React.FC = () => {

  return (
    <div className={styles.podcast}>
      <div className={styles.imageBlock}>
        <div className={styles.layer}> </div>
        <img src="https://e-cdns-images.dzcdn.net/images/cover/b0a4ba818b20b4dfa1a2ec7a844c1988/350x350.jpg" alt="cover"/>
      </div>
      <div className={styles.descriptionBlock}>
        <div className={styles.albumTitle}>
          <span>Chill out mixed compilation Chill out</span>
        </div>
        <div className={styles.singerName}>
          <span>Summer session Summer session</span>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
