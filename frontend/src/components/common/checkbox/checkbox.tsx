import { Control, useController, Path, FieldValues } from 'react-hook-form';
import { InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label: string;
  name: Path<FieldValues>;
  control: Control;
};

const Checkbox: React.FC<Props> = ({
  label,
  name,
  control,
}) => {

  const { field } = useController({ name, control });
  return (
    <label className={styles.checkbox}>
      <input
        {...field}
        type={InputType.CHECKBOX}
        checked={field.value}
      />
      {label}
    </label>
  );
};

export default Checkbox;
