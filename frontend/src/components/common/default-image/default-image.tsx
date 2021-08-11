import { DefaultImageSize } from 'common/enums/ui/ui';
import { getAllowedClasses } from 'helpers/dom/dom';
import { DEFAULT_LABEL } from './common/constants/constants';
import {
  getDefaultImageStyle,
  getLabelSubstring,
} from './common/helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  size?: DefaultImageSize;
  label?: string;
  className?: string;
};

const DefaultImage: React.FC<Props> = ({
  size = DefaultImageSize.MEDIUM,
  label = DEFAULT_LABEL,
  className,
}) => {
  return (
    <div
      style={getDefaultImageStyle(size)}
      className={getAllowedClasses(styles.defaultImage, className)}
    >
      <span>{getLabelSubstring(label)}</span>
    </div>
  );
};

export default DefaultImage;
