import {
  Control,
  Path,
  FieldValues,
  DeepMap,
  FieldError,
  UseFormSetValue,
} from 'react-hook-form';
import { InputType } from 'common/enums/enums';
import { Input } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import { useCallback, useRef } from 'hooks/hooks';
import { MIN_INPUT_TIME } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  placeholder?: string;
  name: Path<FieldValues>;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  setValue: UseFormSetValue<FieldValues>;
  className?: string;
};

const InputTime: React.FC<Props> = ({
  placeholder,
  name,
  control,
  errors,
  setValue,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleIncrement = useCallback(() => {
    inputRef.current?.stepUp();
    setValue(name, inputRef.current?.value);
  }, [inputRef]);

  const handleDecrement = useCallback(() => {
    inputRef.current?.stepDown();
    setValue(name, inputRef.current?.value);
  }, [inputRef]);

  return (
    <div className={getAllowedClasses(styles.inputTime, className)}>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <Input
        label=""
        type={InputType.NUMBER}
        placeholder={placeholder}
        name={name}
        control={control}
        errors={errors}
        min={MIN_INPUT_TIME}
        ref={inputRef}
      />
      <button type="button" onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};

export default InputTime;
