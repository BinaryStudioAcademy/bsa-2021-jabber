import { EpisodeFormPayload, Option, ShownoteRecord } from 'common/types/types';
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
import {
  useAppForm,
  useAppSelector,
  useFieldArray,
  useHistory,
} from 'hooks/hooks';
import {
  Button,
  Input,
  Select,
  ImagePreviewControl,
} from 'components/common/common';
import { episodeCreate as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_CREATE_EPISODE_PAYLOAD } from './common/constants';
import { ShownoteForm, TimeNavigation } from './components/components';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: EpisodeFormPayload) => void;
  payload?: EpisodeFormPayload;
  imageUrl?: string;
};

const selectTypeOptions: Option[] = getOptions(Object.values(EpisodeType));
const selectStatusOptions: Option[] = getOptions(Object.values(EpisodeStatus));

const acceptAudioExtension = getFileExtensions(
  FileExtension.MP3,
  FileExtension.WAV,
);

const CreateEpisodeForm: React.FC<Props> = ({
  onSubmit,
  payload = DEFAULT_CREATE_EPISODE_PAYLOAD,
  imageUrl,
}) => {
  const { control, handleSubmit, errors, register } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: payload,
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: EpisodePayloadKey.SHOWNOTES,
  });

  const history = useHistory();
  const shownotes = fields as ShownoteRecord[];

  const { dataStatus } = useAppSelector(({ episode }) => ({
    dataStatus: episode.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

  const handleCancel = (): void => {
    history.goBack();
  };

  return (
    <div className={styles.episodeForm}>
      <form>
        <fieldset disabled={isFormDisable} className={styles.fieldset}>
          <ImagePreviewControl
            name={EpisodePayloadKey.IMAGE}
            control={control}
            errors={errors}
            imageUrl={imageUrl}
          />
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
          />
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
        </fieldset>
      </form>
      <ShownoteForm shownotes={shownotes} onInsert={append} />
      <TimeNavigation shownotes={shownotes} onRemove={remove} />
      <div className={styles.buttonRow}>
        <Button
          label="Save"
          type={ButtonType.SUBMIT}
          onClick={handleSubmit(onSubmit)}
        />
        <Button
          label="Cancel"
          buttonColor={ButtonColor.LIGHT_PINK}
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateEpisodeForm;
