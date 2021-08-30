import { EpisodeFormPayload, Option } from 'common/types/types';
import { getOptions } from 'helpers/helpers';
import {
  ButtonType,
  DataStatus,
  EpisodePayloadKey,
  EpisodeType,
  InputType,
  EpisodeStatus,
  ButtonColor,
} from 'common/enums/enums';
import { episodeCreate as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector, useHistory } from 'hooks/hooks';
import {
  Button,
  Input,
  Select,
  ImagePreviewControl,
} from 'components/common/common';
import { DEFAULT_CREATE_EPISODE_PAYLOAD } from './common/constants';
import { RecordPreviewControl, TimeNavigation } from './components/components';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: EpisodeFormPayload) => void;
  payload?: EpisodeFormPayload;
  imageUrl?: string;
  fileUrl?: string;
};

const selectTypeOptions: Option[] = getOptions(Object.values(EpisodeType));
const selectStatusOptions: Option[] = getOptions([EpisodeStatus.STAGING, EpisodeStatus.PUBLISHED]);

const CreateEpisodeForm: React.FC<Props> = ({
  onSubmit,
  payload = DEFAULT_CREATE_EPISODE_PAYLOAD,
  imageUrl,
  fileUrl,
}) => {
  const { control, handleSubmit, errors, setValue } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: payload,
  });
  const history = useHistory();

  const { formDataStatus, hasLiveRecord } = useAppSelector(
    ({ configurateEpisode, record }) => ({
      formDataStatus: configurateEpisode.formDataStatus,
      hasLiveRecord: record.hasLiveRecord,
    }),
  );

  const isFormDisabled = formDataStatus === DataStatus.PENDING;

  const handleCancel = (): void => {
    history.goBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <ImagePreviewControl
          name={EpisodePayloadKey.IMAGE}
          control={control}
          errors={errors}
          imageUrl={imageUrl}
          className={styles.image}
          width="100%"
          label="Episode Image"
        />
        <RecordPreviewControl
          name={EpisodePayloadKey.RECORD}
          control={control}
          errors={errors}
          hasLiveRecord={hasLiveRecord}
          fileUrl={fileUrl}
        />
        <Input
          type={InputType.TEXT}
          label="Name episode"
          placeholder="Enter name"
          name={EpisodePayloadKey.NAME}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.TEXT}
          label="Description"
          placeholder="Enter description episode"
          name={EpisodePayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
          hasMultipleRows
        />
        <Select
          options={selectTypeOptions}
          label="Type"
          name={EpisodePayloadKey.TYPE}
          control={control}
          errors={errors}
          isDisabled={isFormDisabled}
        />
        <Select
          options={selectStatusOptions}
          label="Status"
          name={EpisodePayloadKey.STATUS}
          control={control}
          errors={errors}
          isDisabled={isFormDisabled}
        />
        <TimeNavigation control={control} errors={errors} setValue={setValue} />
        <div className={styles.buttonRow}>
          <Button
            label="Save"
            type={ButtonType.SUBMIT}
            className={styles.button}
          />
          <Button
            label="Cancel"
            buttonColor={ButtonColor.LIGHT_PINK}
            onClick={handleCancel}
            className={styles.button}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default CreateEpisodeForm;
