import { EpisodeCreatePayload, Option } from 'common/types/types';
import { getOptions } from 'helpers/helpers';
import { ButtonType, DataStatus, EpisodeCreatePayloadKey, EpisodeType, InputType } from 'common/enums/enums';
import { episode as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input, Select } from 'components/common/common';
import { DEFAULT_CREATE_EPISODE_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: EpisodeCreatePayload) => void;
};

const CreateEpisodeForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: createEpisodeValidationSchema,
    defaultValues: DEFAULT_CREATE_EPISODE_PAYLOAD,
  });

  const { dataStatus } = useAppSelector(({ episode }) => ({
    dataStatus: episode.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

  const selectOptions:Option[] = getOptions(Object.values(EpisodeType));

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
