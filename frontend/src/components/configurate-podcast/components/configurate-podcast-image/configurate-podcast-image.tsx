import { useAppSelector, useRef } from 'hooks/hooks';
import { DataStatus } from 'common/enums/enums';
import styles from './styles.module.scss';
import logoCut from 'assets/img/logo-cut.svg';

type Props = {
  onSubmit: (file: File) => void;
};

const ConfiguratePodcastImage: React.FC<Props> = ({ onSubmit }) => {
  const { createCoverStatus, cover } = useAppSelector(
    ({ configuratePodcast }) => ({
      createCoverStatus: configuratePodcast.dataStatus,
      cover: configuratePodcast.image,
    }),
  );

  const isFormDisabled = createCoverStatus === DataStatus.PENDING;

  const inputFileRef = useRef(null);
  const handleCoverUpload = (): void => {
    const inputFile = inputFileRef.current as unknown as HTMLInputElement;
    const file = inputFile?.files?.[0];

    if (file) {
      onSubmit(file);
    }
  };

  return (
    <form>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <img
          src={cover ? cover.url : logoCut}
          width={195}
          height={195}
          loading="lazy"
          alt="image"
        />
        <input type="file" ref={inputFileRef} />
        <button type="button" onClick={handleCoverUpload}>
          Upload Cover
        </button>
      </fieldset>
    </form>
  );
};

export default ConfiguratePodcastImage;
