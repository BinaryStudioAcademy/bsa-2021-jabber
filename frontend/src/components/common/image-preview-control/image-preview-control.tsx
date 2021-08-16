import {
  FileExtension,
  InputType,
} from 'common/enums/enums';
import {
  FieldValues,
  useController,
  Path,
  Control,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { getFileExtensions, getAllowedClasses } from 'helpers/helpers';
// import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import ImageWrapper from '../image-wrapper/image-wrapper';

type Props = {
  name: Path<FieldValues>;
  control: Control;
  errors: FieldValues;
  imageUrl?: string;
  label?: string;
  className?: string;
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
}) => {
  const { field } = useController({ name, control });

  const handleChange = (evt: React.ChangeEvent<FieldValues>): void => {
    const hasImg = Boolean(evt.target.files.length);
    const [file] = evt.target.files ?? [];
    const imgUrl = hasImg
      ? URL.createObjectURL(file)
      : imageUrl;

    field.onChange(imgUrl);
  };

  const allowedClassesInputWrapper = getAllowedClasses(
    className,
    styles.inputWrapper,
  );

  return (
    <>
      <label className={allowedClassesInputWrapper}>
        {label &&
          <span className={styles.cornerRight}>
            {label}
          </span>}
        <ImageWrapper
          src={field.value ?? imageUrl}
          width="716"
          height="281"
          loading="lazy"
          className={className}
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
