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
      <Input
        type={InputType.TEXT}
        label="Name"
        placeholder="Enter show-note name"
        name={
          `${EpisodePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.NAME}` as 'shownotes[x].name'
        }
        control={control}
        errors={errors}
      />
      <Input
        type={InputType.NUMBER}
        label="Timestamp"
        placeholder="Enter show-note timestamp"
        name={
          `${EpisodePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.TIMESTAMP}` as 'shownotes[x].timestamp'
        }
        control={control}
        errors={errors}
      />
      <div className={styles.errorWrapper}>
        <ErrorMessage
          errors={errors}
          name={`${EpisodePayloadKey.SHOWNOTES}[${index}]`}
        />
      </div>
      <Button
        label="Delete"
        buttonColor={ButtonColor.LIGHT_PINK}
        onClick={handleRemove}
      />
    </li>
  );
};

export default ShownoteInput;
