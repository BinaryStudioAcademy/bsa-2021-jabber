import {
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import defaultImage from 'assets/img/default-podcast-image.jpeg';
import { getFileExtensions } from 'helpers/helpers';
import {
  FileExtension,
  PodcastPayloadKey,
  InputType,
} from 'common/enums/enums';
import styles from './styles.module.scss';
import cameraIcon from 'assets/img/icon-camera.svg';
import { useState } from 'hooks/hooks';

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
    <div className={styles.updeteImgWrapper}>
      <img
        src={img}
        width="716"
        height="281"
        loading="lazy" alt=""
      />
      <div className={styles.panel}>
        <label htmlFor={styles.imgField}>
          <img
            src={cameraIcon}
            width="24"
            height="20"
            loading="lazy"
            alt=""
            className={styles.cameraIcon}
          />
        </label>
        <input
          {...register(PodcastPayloadKey.IMAGE)}
          accept={acceptExtension}
          type={InputType.FILE}
          id={styles.imgField}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputImage;
