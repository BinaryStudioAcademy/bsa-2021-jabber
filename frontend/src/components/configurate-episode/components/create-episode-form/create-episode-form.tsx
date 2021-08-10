import { EpisodeFormPayload, Option } from 'common/types/types';
import { getOptions, getFileExtensions } from 'helpers/helpers';
import {
  ButtonType,
  DataStatus,
  EpisodePayloadKey,
  EpisodeType,
  InputType,
  FileExtension,
  EpisodeStatus,
} from 'common/enums/enums';
import { episodeCreate as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Button, Input, Select } from 'components/common/common';
import { DEFAULT_CREATE_EPISODE_PAYLOAD } from './common/constants';
import ShownoteInputList from './components/shownote-input-list/shownote-input-list';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: EpisodeFormPayload) => void;
  payload?: EpisodeFormPayload;
};

const selectTypeOptions: Option[] = getOptions(Object.values(EpisodeType));
const selectStatusOptions: Option[] = getOptions(Object.values(EpisodeStatus));

const acceptExtension = getFileExtensions(
  FileExtension.JPEG,
  FileExtension.JPG,
  FileExtension.PNG,
  FileExtension.SVG,
);
const acceptAudioExtension = getFileExtensions(
  FileExtension.MP3,
  FileExtension.WAV,
);

const CreateEpisodeForm: React.FC<Props> = ({ onSubmit, payload = DEFAULT_CREATE_EPISODE_PAYLOAD }) => {
  const { control, handleSubmit, errors, register } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: payload,
  });

  const { dataStatus } = useAppSelector(({ episode }) => ({
    dataStatus: episode.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
        <Input
          type={InputType.TEXT}
          label="Name"
          placeholder="Enter episode name"
          name={EpisodePayloadKey.NAME}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.TEXT}
          label="Description"
          placeholder="Enter episode description"
          name={EpisodePayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
        />
        <ShownoteInputList control={control} errors={errors} />
        <Select
          options={selectTypeOptions}
          label="Type"
          name={EpisodePayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <Select
          options={selectStatusOptions}
          label="Status"
          name={EpisodePayloadKey.STATUS}
          control={control}
          errors={errors}
        />
        <label>
          Image
          <input
            {...register(EpisodePayloadKey.IMAGE)}
            accept={acceptExtension}
            type={InputType.FILE}
          />
        </label>
        <label>
          Record
          <input
            {...register(EpisodePayloadKey.RECORD)}
            accept={acceptAudioExtension}
            type={InputType.FILE}
          />
        </label>
        <Button label="Save" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default CreateEpisodeForm;
