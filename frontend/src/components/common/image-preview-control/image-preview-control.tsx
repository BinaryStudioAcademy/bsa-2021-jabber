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
import { getFileExtensions } from 'helpers/helpers';
import styles from './styles.module.scss';
import ImageWrapper from '../image-wrapper/image-wrapper';
import { getAllowedClasses } from 'helpers/dom/dom';
import { ImagePreviewStyle } from 'common/enums/ui/image-preview-control-style.enum';

type Props = {
  name: Path<FieldValues>;
  control: Control;
  errors: FieldValues;
  imageUrl?: string;
  label?: string;
  className?: string;
  imagePreviewStyle?: ImagePreviewStyle;
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
  label = 'Image',
  className,
  imagePreviewStyle = ImagePreviewStyle.WIDE,
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
    styles[`style${imagePreviewStyle}`],
  );

  const allowedClassesImage = getAllowedClasses(
    styles[`style${imagePreviewStyle}`],
  );

  return (
    <>
      <label className={allowedClassesInputWrapper}>
        <div className={styles.cornerRight}>
          <span className={styles.label}>{label}</span>
        </div>
        <ImageWrapper
          src={field.value ?? imageUrl}
          width="716"
          height="281"
          loading="lazy"
          className={allowedClassesImage}
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
