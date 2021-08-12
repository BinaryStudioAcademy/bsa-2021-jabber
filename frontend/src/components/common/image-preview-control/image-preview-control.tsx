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
import defaultImage from 'assets/img/default-podcast-image.jpeg';
import styles from './styles.module.scss';

type Props = {
  name: Path<FieldValues>;
  control: Control;
  errors: FieldValues;
  imageUrl?: string;
};

const acceptExtension = getFileExtensions(
  FileExtension.JPEG,
  FileExtension.JPG,
  FileExtension.PNG,
  FileExtension.SVG,
);

const ImagePreviewControl: React.FC<Props> = ({ name, control, errors, imageUrl }) => {
  const { field } = useController({ name, control });

  const handleChange = (evt: React.ChangeEvent<FieldValues>): void => {
    const hasImg = Boolean(evt.target.files.length);
    const imgUrl = hasImg
      ? URL.createObjectURL(evt.target.files[0])
      : imageUrl ?? defaultImage;

    field.onChange(imgUrl);
  };

  return (
    <>
      <label className={styles.inputWrapper}>
        <img
          src={field.value ?? imageUrl ?? defaultImage}
          width="716"
          height="281"
          loading="lazy" alt=""
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
