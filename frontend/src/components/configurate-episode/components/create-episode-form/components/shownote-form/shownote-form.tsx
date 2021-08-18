import { ErrorMessage } from '@hookform/error-message';
import { useAppForm } from 'hooks/hooks';
import { shownoteCreate as shownoteCreateValidationSchema } from 'validation-schemas/validation-schemas';
import {
  ButtonColor,
  ButtonType,
  InputType,
  ShownotePayloadKey,
} from 'common/enums/enums';
import {
  ShownoteCreatePayload,
  ShownotePayload,
  ShownoteRecord,
} from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  DEFAULT_INPUT_SHOWNOTE_PAYLOAD,
  SHOWNOTES_UNIQ_ERROR,
  SHOWNOTES_UNIQ_ERROR_MESSAGE,
} from './common/constants';
import {
  mapCreateShownotePayload,
  isShownoteUniq,
} from './common/helpers/helpers';
import InputTime from './components/input-time/input-time';
import styles from './styles.module.scss';

type Props = {
  shownotes: ShownoteRecord[];
  onInsert: (value: ShownotePayload) => void;
};

const ShownoteForm: React.FC<Props> = ({ shownotes, onInsert }) => {
  const { control, handleSubmit, errors, setError, setValue, reset } =
    useAppForm({
      validationSchema: shownoteCreateValidationSchema,
      defaultValues: DEFAULT_INPUT_SHOWNOTE_PAYLOAD,
    });

  const onSubmit = (data: ShownoteCreatePayload): void => {
    if (isShownoteUniq(data, shownotes)) {
      onInsert(mapCreateShownotePayload(data));
      reset();
    } else {
      setError(SHOWNOTES_UNIQ_ERROR, {
        type: 'value',
        message: SHOWNOTES_UNIQ_ERROR_MESSAGE,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.shownoteForm}>
      <h3 className={styles.caption}>Time navigation</h3>
      <div className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={SHOWNOTES_UNIQ_ERROR} />
      </div>
      <div className={styles.fields}>
        <InputTime
          placeholder="min"
          name={ShownotePayloadKey.MINUTES}
          control={control}
          errors={errors}
          setValue={setValue}
          className={styles.inputTime}
        />
        <InputTime
          placeholder="sec"
          name={ShownotePayloadKey.SECONDS}
          control={control}
          errors={errors}
          setValue={setValue}
          className={styles.inputTime}
        />
        <Input
          type={InputType.TEXT}
          label=""
          placeholder="Brief description of time navigation"
          name={ShownotePayloadKey.NAME}
          control={control}
          errors={errors}
        />
      </div>
      <Button
        className={styles.submitBtn}
        type={ButtonType.SUBMIT}
        label="Add time navigation"
        buttonColor={ButtonColor.LIGHT_PINK}
      />
    </form>
  );
};

export default ShownoteForm;
