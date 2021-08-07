import { getFileExtensions, getOptions } from 'helpers/helpers';
import {
  PodcastPayloadKey,
  ButtonType,
  DataStatus,
  InputType,
  FileExtension,
  PodcastType,
} from 'common/enums/enums';
import { Option, PodcastFormPayload } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Input, Button, Select } from 'components/common/common';
import { podcastCreate as podcastCreateSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: PodcastFormPayload) => void;
  payload?: PodcastFormPayload
};

const acceptExtension = getFileExtensions(
  FileExtension.JPEG,
  FileExtension.JPG,
  FileExtension.PNG,
  FileExtension.SVG,
);

const ConfiguratePodcastForm: React.FC<Props> = ({ onSubmit, payload = DEFAULT_PODCAST_PAYLOAD }) => {
  const { control, handleSubmit, errors, register } = useAppForm({
    validationSchema: podcastCreateSchema,
    defaultValues: payload,
  });

  const { createPodcastStatus } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
  }));

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  const selectOptions:Option[] = getOptions(Object.values(PodcastType));

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <Input
          name={PodcastPayloadKey.NAME}
          control={control}
          errors={errors}
          label="Podcast Name"
          placeholder="Name"
        />
        <Input
          name={PodcastPayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
          label="Podcast Description"
          placeholder="Description"
          hasMultipleRows
        />
        <Select
          options={selectOptions}
          label="Type"
          name={PodcastPayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <input
          {...register(PodcastPayloadKey.IMAGE)}
          accept={acceptExtension}
          type={InputType.FILE}
        />
        <Button label="Save" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default ConfiguratePodcastForm;
