import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from 'react-hook-form';
import { useRef } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import { Input } from 'components/common/common';
import { ButtonType, InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
  setValue: UseFormSetValue<FieldValues>;
};

const TimeInput: React.FC<Props> = ({
  className,
  placeholder,
  min,
  max,
  name,
  control,
  errors,
  setValue,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleIncrement = (): void => {
    inputRef.current?.stepUp();
    setValue(name, inputRef.current?.value);
  };

  const handleDecrement = (): void => {
    inputRef.current?.stepDown();
    setValue(name, inputRef.current?.value);
  };

  return (
    <div className={getAllowedClasses(styles.timeInput, className)}>
      <button
        type={ButtonType.BUTTON}
        className={styles.incrementBtn}
        onClick={handleIncrement}
      >
        +
      </button>
      <Input
        label=""
        type={InputType.NUMBER}
        className={styles.input}
        placeholder={placeholder}
        min={min}
        max={max}
        ref={inputRef}
        name={name}
        control={control}
        errors={errors}
      />
      <button
        type={ButtonType.BUTTON}
        className={styles.decrementBtn}
        onClick={handleDecrement}
      >
        -
      </button>
    </div>
  );
};

export default TimeInput;
