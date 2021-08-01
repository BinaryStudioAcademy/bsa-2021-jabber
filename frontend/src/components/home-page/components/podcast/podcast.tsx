import styles from './styles.module.scss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

type Props = {
  cover: string;
  albumTitle: string;
  singerName: string
  alt: string;
  width?: string;
  height?: string;
  loading?: ImageProps;
};

const Podcast: React.FC<Props> = ({
  cover,
  albumTitle,
  singerName,
  alt,
  width,
  height,
}, { loading }: ImageProps) => (
  <div className={styles.podcast}>
    <div className={styles.imageBlock}>
      <div className={styles.layer}> </div>
      <img src={cover} alt={alt} width={width} height={height} loading={loading}/>
    </div>
    <div className={styles.descriptionBlock}>
      <div className={styles.albumTitle}>
        <span>{albumTitle}</span>
      </div>
      <div className={styles.singerName}>
        <span>{singerName}</span>
      </div>
    </div>
  </div>
);

export default Podcast;
