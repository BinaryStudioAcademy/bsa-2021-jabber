import { EpisodeFormPayload, Option } from 'common/types/types';
import { getOptions, getFileExtensions } from 'helpers/helpers';
import {
  ButtonType,
  DataStatus,
  EpisodePayloadKey,
  EpisodeType,
  InputType,
  FileExtension,
} from 'common/enums/enums';
import { episodeCreate as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input, Select } from 'components/common/common';
import { DEFAULT_CREATE_EPISODE_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: EpisodeFormPayload) => void;
};

const acceptAudioExtension = getFileExtensions(
  FileExtension.MP3,
  FileExtension.WAV,
);

const CreateEpisodeForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, register } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: DEFAULT_CREATE_EPISODE_PAYLOAD,
  });

  const { dataStatus } = useAppSelector(({ episode }) => ({
    dataStatus: episode.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

  const selectOptions: Option[] = getOptions(Object.values(EpisodeType));

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
        <Select
          options={selectOptions}
          label="Type"
          name={EpisodePayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <input
          {...register(EpisodePayloadKey.RECORD)}
          accept={acceptAudioExtension}
          type={InputType.FILE}
        />
        <Button label="Save" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default CreateEpisodeForm;
