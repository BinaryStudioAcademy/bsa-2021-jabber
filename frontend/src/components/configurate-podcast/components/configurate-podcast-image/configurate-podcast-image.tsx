import { useAppSelector } from 'hooks/hooks';
import { DataStatus, ImageFileExtension } from 'common/enums/enums';
import styles from './styles.module.scss';
import logoCut from 'assets/img/logo-cut.svg';

type Props = {
  onSubmit: (file: File) => void;
  imageSrc: string;
};

const fileMask = Object.values(ImageFileExtension).join(', ');

const ConfiguratePodcastImage: React.FC<Props> = ({ onSubmit, imageSrc }) => {
  const { createPodcastStatus } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
  }));

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  const handleCoverUpload = (evt: React.FormEvent<HTMLInputElement>): void => {
    const [file] = evt.currentTarget?.files ?? [];

    if (file) {
      onSubmit(file);
    }
  };

  return (
    <form>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <img
          src={imageSrc ? imageSrc : logoCut}
          width={195}
          height={195}
          loading="lazy"
          alt="image"
        />
        <input type="file" accept={fileMask} onChange={handleCoverUpload} />
      </fieldset>
    </form>
  );
};

export default ConfiguratePodcastImage;
