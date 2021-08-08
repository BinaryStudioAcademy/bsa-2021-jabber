import { EpisodeCreatePayload, Option } from 'common/types/types';
import { getOptions } from 'helpers/helpers';
import {
  ButtonColor,
  ButtonType,
  DataStatus,
  EpisodeCreatePayloadKey,
  EpisodeType,
  InputType,
} from 'common/enums/enums';
import { episode as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import {
  useAppForm,
  useFieldArray,
  useAppSelector,
  useCallback,
} from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input, Select } from 'components/common/common';
import {
  DEFAULT_CREATE_EPISODE_PAYLOAD,
  DEFAULT_CREATE_SHOWNOTE_PAYLOAD,
} from './common/constants';
import { ErrorMessage } from '@hookform/error-message';
import { ShownoteCreatePayloadKey } from 'jabber-shared/common/enums/enums';

type Props = {
  onSubmit: (payload: EpisodeCreatePayload) => void;
};

const CreateEpisodeForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: DEFAULT_CREATE_EPISODE_PAYLOAD,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: EpisodeCreatePayloadKey.SHOWNOTES,
  });

  const { dataStatus } = useAppSelector(({ episode }) => ({
    dataStatus: episode.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

  const selectOptions: Option[] = getOptions(Object.values(EpisodeType));

  const handleAddShownote = useCallback((): void => {
    append(DEFAULT_CREATE_SHOWNOTE_PAYLOAD);
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
        <Input
          type={InputType.TEXT}
          label="Name"
          placeholder="Enter episode name"
          name={EpisodeCreatePayloadKey.NAME}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.TEXT}
          label="Description"
          placeholder="Enter episode description"
          name={EpisodeCreatePayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
        />
        <div className={styles.shownotesTitle}>
          Shownotes
          <Button
            label="Add"
            buttonColor={ButtonColor.LIGHT_PINK}
            onClick={handleAddShownote}
          />
        </div>
        <ul className={styles.shownotesList}>
          {fields.map((item, index) => (
            <li key={item.id} className={styles.shownotesListItem}>
              <Input
                type={InputType.TEXT}
                label="Name"
                placeholder="Enter show-note name"
                name={
                  `${EpisodeCreatePayloadKey.SHOWNOTES}[${index}].${ShownoteCreatePayloadKey.NAME}` as 'shownotes[x].name'
                }
                control={control}
                errors={errors}
              />
              <Input
                type={InputType.NUMBER}
                label="Timestamp"
                placeholder="Enter show-note timestamp"
                name={
                  `${EpisodeCreatePayloadKey.SHOWNOTES}[${index}].${ShownoteCreatePayloadKey.TIMESTAMP}` as 'shownotes[x].timestamp'
                }
                control={control}
                errors={errors}
              />
              <div className={styles.errorWrapper}>
                <ErrorMessage
                  errors={errors}
                  name={`${EpisodeCreatePayloadKey.SHOWNOTES}[${index}]`}
                />
              </div>
              <Button
                label="Delete"
                buttonColor={ButtonColor.LIGHT_PINK}
                onClick={(): void => remove(index)}
              />
            </li>
          ))}
        </ul>
        <Select
          options={selectOptions}
          label="Type"
          name={EpisodeCreatePayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <Button label="Upload" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default CreateEpisodeForm;
