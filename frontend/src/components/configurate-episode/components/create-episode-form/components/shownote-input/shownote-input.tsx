import { Control, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import {
  ButtonColor,
  EpisodePayloadKey,
  InputType,
  ShownotePayloadKey,
} from 'common/enums/enums';
import { Button, Input } from 'components/common/common';
import styles from './styles.module.scss';
import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from 'react';

type Props = {
  index: number;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  onRemove: (index: number) => void;
};

const ShownoteInput: React.FC<Props> = ({
  index,
  control,
  errors,
  onRemove,
}) => {
  const handleRemove = useCallback(() => {
    onRemove(index);
  }, []);

  return (
    <li className={styles.shownoteInputs}>
      <div className={styles.inputRow}>
        <Input
          type={InputType.NUMBER}
          label=""
          placeholder="Sec"
          name={
            `${EpisodePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.TIMESTAMP}` as 'shownote[x].timestamp'
          }
          control={control}
          errors={errors}
        />
        <Input
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
