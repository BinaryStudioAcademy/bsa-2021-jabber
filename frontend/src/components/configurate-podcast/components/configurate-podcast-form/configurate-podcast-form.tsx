import { PodcastCreatePayloadKey } from 'common/enums/enums';
import { PodcastCreatePayload } from 'common/types/types';
import { ButtonType, DataStatus } from 'common/enums/enums';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { podcast as podcastSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <Input
          name={PodcastCreatePayloadKey.NAME}
          control={control}
          errors={errors}
          label="Podcast Name"
          placeholder="Name"
        />
        <Input
          name={PodcastCreatePayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
          label="Podcast Description"
          placeholder="Description"
        />
        <Button label="Save" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default ConfiguratePodcastForm;
