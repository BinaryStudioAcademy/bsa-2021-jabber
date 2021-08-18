import { ButtonType } from 'common/enums/enums';
import { getTimeOffset } from 'helpers/helpers';
import { useCallback } from 'hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  index: number;
  timestamp: number;
  name: string;
  onRemove: (index: number) => void;
};

const ShownoteField: React.FC<Props> = ({
  index,
  name,
  timestamp,
  onRemove,
}) => {
  const handleRemove = useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  const time = getTimeOffset(timestamp);

  return (
    <div className={styles.shownoteField}>
      <div className={styles.time}>{time}</div>
      <div className={styles.name}>{name}</div>
      <button
        type={ButtonType.BUTTON}
        onClick={handleRemove}
        className={styles.removeBtn}
      >
        <span className={styles.removeBtnText}>Remove the shownote</span>
      </button>
    </div>
  );
};

export default ShownoteField;
