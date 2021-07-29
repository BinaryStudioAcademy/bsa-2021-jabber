import { useState } from 'hooks/hooks';
import Button from '../../common/button/button';
import Checkbox from '../../common/checkbox/checkbox';
import styles from '../styles.module.scss';

const FilterDialog: React.FC = () => {

  const checkBoxesCount = 22;

  const [isChecked, setChecked] = useState(false);

  const onCheckBoxChange = ():void => {
    setChecked(!isChecked);
  };

  return (
    <div className={styles.filterDialog}>
      <div className={styles.titleBlock}>
        <span className={styles.filter}>Filter</span>
        <span className={styles.clear}>Clear All</span>
      </div>
      <div className={styles.filtersBlock}>
        <ul>
          {[...Array(checkBoxesCount)].map((item, index) => <li key={index}>
            <Checkbox label="All" name="all" isChecked={isChecked} onChange={onCheckBoxChange}/>
          </li>)
          }
        </ul>
      </div>
      <div className={styles.buttonsBlock}>
        <Button className={styles.applyButton} label="Apply"/>
        <Button className={styles.cancelButton} label="Cancel"/>
      </div>
    </div>
  );
};

export default FilterDialog;
