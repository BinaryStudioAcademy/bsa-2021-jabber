import { FileExtension, InputType } from 'common/enums/enums';
import { FieldValues, useController, Path, Control } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { getFileExtensions, getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import ImageWrapper from '../image-wrapper/image-wrapper';
import { useState } from 'react';

type Props = {
  name: Path<FieldValues>;
  control: Control;
  errors: FieldValues;
  imageUrl?: string;
  label?: string;
  className?: string;
  width?: string;
  height?: string;
};

const acceptExtension = getFileExtensions(
  FileExtension.JPEG,
  FileExtension.JPG,
  FileExtension.PNG,
  FileExtension.SVG,
);

const ImagePreviewControl: React.FC<Props> = ({
  name,
  control,
  errors,
  imageUrl,
  label,
  className,
  width,
  height = '281',
}) => {
  const { field } = useController({ name, control });

  const [currentImgUrl, setImgUrl] = useState<string | undefined>(imageUrl);

  const handleChange = (evt: React.ChangeEvent<FieldValues>): void => {
    const hasImg = Boolean(evt.target.files.length);
    const [file] = evt.target.files ?? [];

    if (!file) {
      return;
    }

    setImgUrl(hasImg ? URL.createObjectURL(file) : imageUrl);

    field.onChange(evt.target.files);
  };

  const allowedClassesInputWrapper = getAllowedClasses(
    className,
    styles.inputWrapper,
  );

  return (
    <>
      <label className={allowedClassesInputWrapper}>
        {label && <span className={styles.cornerRight}>{label}</span>}
        <ImageWrapper
          src={currentImgUrl ?? imageUrl}
          width={width}
          height={height}
          loading="lazy"
          label={label}
          className={styles.defaultImage}
        />
        <input
          {...control.register(name)}
          accept={acceptExtension}
          type={InputType.FILE}
          onChange={handleChange}
          className="visually-hidden"
        />
      </label>
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
};

export default ImagePreviewControl;
