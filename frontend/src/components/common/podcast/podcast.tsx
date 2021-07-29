import styles from './styles.module.scss';

type Props = {
  cover: string;
  albumTitle: string;
  singerName: string
};

const Podcast: React.FC<Props> = ({ cover, albumTitle, singerName }) => {

  return (
    <div className={styles.podcast}>
      <div className={styles.imageBlock}>
        <div className={styles.layer}> </div>
        <img src={ cover } alt="cover"/>
      </div>
      <div className={styles.descriptionBlock}>
        <div className={styles.albumTitle}>
          <span>{ albumTitle }</span>
        </div>
        <div className={styles.singerName}>
          <span>{ singerName }</span>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
