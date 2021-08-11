import { getOptions } from 'helpers/helpers';
import {
  PodcastPayloadKey,
  ButtonType,
  DataStatus,
  PodcastType,
  AppRoute,
  ButtonColor,
} from 'common/enums/enums';
import { Option, PodcastFormPayload } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Input, Button, Select, ImagePreviewControl } from 'components/common/common';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';
import { podcastCreate as podcastCreateSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: PodcastFormPayload) => void;
  payload?: PodcastFormPayload;
};

const selectOptions: Option[] = getOptions(Object.values(PodcastType));

const ConfiguratePodcastForm: React.FC<Props> = ({
  onSubmit,
  payload = DEFAULT_PODCAST_PAYLOAD,
}) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: podcastCreateSchema,
    defaultValues: payload,
  });

  const { createPodcastStatus } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
  }));

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <ImagePreviewControl
          name={PodcastPayloadKey.IMAGE}
          control={control}
          errors={errors}
        />
        <Input
          name={PodcastPayloadKey.NAME}
          control={control}
          errors={errors}
          label="Podcast Name"
          placeholder="Enter Name"
        />
        <Select
          options={selectOptions}
          label="Type"
          name={PodcastPayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <Input
          name={PodcastPayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
          label="Description"
          placeholder="Enter description podcast"
          hasMultipleRows
        />
        <div className={styles.btnsWrapper}>
          <Button
            className={styles.btnSave}
            label="Save"
            type={ButtonType.SUBMIT}
          />
          <Button
            className={styles.btnCancel}
            buttonColor={ButtonColor.LIGHT_PINK}
            label="Cancel"
            type={ButtonType.SUBMIT}
            href={AppRoute.ROOT}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ConfiguratePodcastForm;
