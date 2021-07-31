import { PodcastCreatePayload } from 'common/types/types';
import { ButtonType, DataStatus } from 'common/enums/enums';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { podcast as podcastSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';
import logoCut from 'assets/img/logo-cut.svg';

type Props = {
  onSubmit: (payload: PodcastCreatePayload) => void;
};

const ConfiguratePodcastForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: podcastSchema,
    defaultValues: DEFAULT_PODCAST_PAYLOAD,
  });

  const { createPodcastStatus } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
  }));

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  return (
    <form
      className={styles.createPodcastWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <fieldset disabled={isFormDisabled} className={styles.fieldset}>
            <p>
              <Input
                label="Podcast name"
                name="name"
                control={control}
                errors={errors}
              />
            </p>
          </fieldset>
        </div>
        <div>
          <img src={logoCut} />
        </div>
      </div>
      <p>
        <Button label="Save" type={ButtonType.SUBMIT} />
      </p>
    </form>
  );
};

export default ConfiguratePodcastForm;
