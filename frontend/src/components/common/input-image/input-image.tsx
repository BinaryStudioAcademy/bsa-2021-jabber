import {
  FileExtension,
  PodcastPayloadKey,
  InputType,
} from 'common/enums/enums';
import {
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { useState } from 'hooks/hooks';
import { getFileExtensions } from 'helpers/helpers';
import cameraIcon from 'assets/img/icon-camera.svg';
import defaultImage from 'assets/img/default-podcast-image.jpeg';
import styles from './styles.module.scss';

type Props = {
  register: UseFormRegister<FieldValues>;
  image?: string;
};

const acceptExtension = getFileExtensions(
  FileExtension.JPEG,
  FileExtension.JPG,
  FileExtension.PNG,
  FileExtension.SVG,
);

const InputImage: React.FC<Props> = ({ register, image }) => {
  const [img, setImg] = useState(image ?? defaultImage);

  const handleChange = (evt: React.ChangeEvent<FieldValues>): void => {
    const hasImg = Boolean(evt.target.files.length);
    const imgUrl = hasImg
      ? URL.createObjectURL(evt.target.files[0])
      : image ?? defaultImage;

    setImg(imgUrl);
  };

  return (
    <label className={styles.inputWrapper}>
      <img
        src={img}
        width="716"
        height="281"
        loading="lazy" alt=""
      />
      <div className={styles.panel}>
        <img
          src={cameraIcon}
          width="24"
          height="20"
          loading="lazy"
          alt=""
          className={styles.cameraIcon}
        />
      </div>
      <input
        {...register(PodcastPayloadKey.IMAGE)}
        accept={acceptExtension}
        type={InputType.FILE}
        onChange={handleChange}
        className="visually-hidden"
      />
    </label>
  );
};

export default InputImage;
