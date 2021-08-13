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
  ButtonColor,
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
  imageUrl?: string;
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

const CreateEpisodeForm: React.FC<Props> = ({ onSubmit, payload = DEFAULT_CREATE_EPISODE_PAYLOAD, imageUrl }) => {
  const { control, handleSubmit, errors, register } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: payload,
  });

  const { dataStatus } = useAppSelector(({ episode }) => ({
    dataStatus: episode.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
        <label
          className={styles.imageLabel}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <input
            {...register(EpisodePayloadKey.IMAGE)}
            accept={acceptExtension}
            type={InputType.FILE}
          />
        </label>
        <label className={styles.recordLabel}>
          Upload record
          <input
            {...register(EpisodePayloadKey.RECORD)}
            accept={acceptAudioExtension}
            type={InputType.FILE}
          />
        </label>
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
          rows={7}
        />
        <label className={styles.selectLabel}>
          <Select
            options={selectTypeOptions}
            label="Type"
            name={EpisodePayloadKey.TYPE}
            control={control}
            errors={errors}
          />
        </label>
        <label className={styles.selectLabel}>
          <Select
            options={selectStatusOptions}
            label="Status"
            name={EpisodePayloadKey.STATUS}
            control={control}
            errors={errors}
          />
        </label>
        <ShownoteInputList control={control} errors={errors} />
        <div className={styles.buttonRow}>
          <Button label="Save" type={ButtonType.SUBMIT} />
          <Button label="Cancel" buttonColor={ButtonColor.LIGHT_PINK} />
        </div>
      </fieldset>
    </form >
  );
};

export default CreateEpisodeForm;
