import { getAllowedClasses } from 'helpers/dom/dom';
import { DEFAULT_LABEL } from './common/constants/constants';
import { getLabelSubstring } from './common/helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  label?: string;
  className?: string;
};

const DefaultImage: React.FC<Props> = ({
  label = DEFAULT_LABEL,
  className,
}) => {
  return (
    <div className={getAllowedClasses(styles.defaultImage, className)}>
      <span>{getLabelSubstring(label)}</span>
    </div>
  );
};

export default DefaultImage;
