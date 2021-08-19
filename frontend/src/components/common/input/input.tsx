import React, { forwardRef } from 'react';
import {
  Control,
  FieldErrors,
  useController,
  Path,
  FieldValues,
} from 'react-hook-form';
import { IconName, InputType } from 'common/enums/enums';
import { ErrorMessage } from '@hookform/error-message';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  type?: InputType;
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
  hasMultipleRows?: boolean;
  icon?: IconName;
  className?: string;
  min?: number;
  max?: number;
};

type Ref = HTMLInputElement | HTMLTextAreaElement;

const Input = forwardRef<Ref, Props>(
  (
    {
      label,
      name,
      control,
      errors,
      placeholder = '',
      type = InputType.TEXT,
      hasMultipleRows = false,
      icon,
      className,
      min,
      max,
    },
    ref,
  ) => {
    const { field } = useController({ name, control });

    return (
      <label className={styles.inputWrapper}>
        <span className={styles.label}>{label}</span>
        {hasMultipleRows ? (
          <textarea
            {...field}
            placeholder={placeholder}
            className={getAllowedClasses(styles.input, styles.textarea)}
            ref={ref as React.Ref<HTMLTextAreaElement>}
          />
        ) : (
          <input
            {...field}
            min={min}
            max={max}
            type={type}
            placeholder={placeholder}
            className={getAllowedClasses(
              className,
              styles.input,
              styles[`icon--${icon}`],
            )}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
        <span className={styles.errorWrapper}>
          <ErrorMessage errors={errors} name={name} />
        </span>
      </label>
    );
  },
);

export default Input;
