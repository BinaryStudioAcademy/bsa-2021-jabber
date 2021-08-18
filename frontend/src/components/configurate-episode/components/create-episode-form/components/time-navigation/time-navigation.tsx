import { ShownoteRecord } from 'common/types/types';
import ShownoteField from './components/shownote-field/shownote-field';
import { sortShownotes } from './common/helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  shownotes: ShownoteRecord[];
  onRemove: (index?: number | number[] | undefined) => void;
};

const TimeNavigation: React.FC<Props> = ({ shownotes, onRemove }) => {
  const sortedShownotes = sortShownotes(shownotes);

  return shownotes.length ? (
    <div className={styles.timeNavigation}>
      <span className={styles.title}>View time navigation</span>
      <ul className={styles.navigationList}>
        {sortedShownotes.map((item, index) => (
          <ShownoteField
            key={item.id}
            index={index}
            name={item.name}
            timestamp={item.timestamp}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

export default TimeNavigation;
