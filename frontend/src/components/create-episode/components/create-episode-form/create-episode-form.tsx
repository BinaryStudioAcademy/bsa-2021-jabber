import { EpisodeCreatePayload } from 'common/types/types';
import {
  ButtonType,
  DataStatus,
  InputType,
  EpisodeCreatePayloadKey,
} from 'common/enums/enums';
import { episode as createEpisodeValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input } from 'components/common/common';
import { DEFAULT_CREATE_EPISODE_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: EpisodeCreatePayload) => void;
};

const CreateEpisodeForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm( {
    validationSchema: createEpisodeValidationSchema,
    defaultValues: DEFAULT_CREATE_EPISODE_PAYLOAD,
  } );

  const { dataStatus } = useAppSelector(({ episodepage }) => ({
    dataStatus: episodepage.dataStatus,
  }));

  const isFormDisable = dataStatus === DataStatus.PENDING;

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
        <Button label="Upload" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default CreateEpisodeForm;
