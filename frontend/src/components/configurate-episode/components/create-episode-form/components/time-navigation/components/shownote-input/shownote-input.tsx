import {
  Control,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  ButtonColor,
  EpisodePayloadKey,
  InputType,
  ShownotePayloadKey,
  ShownoteValidationRule,
} from 'common/enums/enums';
import { Button, Input } from 'components/common/common';
import { useCallback } from 'hooks/hooks';
import TimeInput from './components/time-input/time-input';
import styles from './styles.module.scss';

type Props = {
  index: number;
  onRemove: (index: number) => void;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  setValue: UseFormSetValue<FieldValues>;
};

const ShownoteInput: React.FC<Props> = ({
  index,
  onRemove,
  control,
  errors,
  setValue,
}) => {
  const handleRemove = useCallback(() => {
    onRemove(index);
  }, []);

  return (
    <li className={styles.shownoteInput}>
      <div className={styles.inputRow}>
        <TimeInput
          className={styles.inputTime}
          placeholder="min"
          name={
            `${EpisodePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.MINUTES}` as 'shownote[x].minutes'
          }
          min={ShownoteValidationRule.MINUTES_MIN_VALUE}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <TimeInput
          className={styles.inputTime}
          placeholder="sec"
          name={
            `${EpisodePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.SECONDS}` as 'shownote[x].seconds'
          }
          min={ShownoteValidationRule.SECONDS_MIN_VALUE}
          max={ShownoteValidationRule.SECONDS_MAX_VALUE}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <Input
          className={styles.inputName}
          type={InputType.TEXT}
          label=""
          placeholder="Brief description of time navigation"
          name={
            `${EpisodePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.NAME}` as 'shownote[x].name'
          }
          control={control}
          errors={errors}
        />
        <Button
          label="Delete"
          buttonColor={ButtonColor.LIGHT_PINK}
          className={styles.deleteBtn}
          onClick={handleRemove}
        />
      </div>
      <div className={styles.errorWrapper}>
        <ErrorMessage
          errors={errors}
          name={`${EpisodePayloadKey.SHOWNOTES}[${index}]`}
        />
      </div>
    </li>
  );
};

export default ShownoteInput;
