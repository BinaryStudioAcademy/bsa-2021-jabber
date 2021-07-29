import Button from '../../common/button/button';
import styles from '../styles.module.scss';
import Checkbox from '../../common/checkbox/checkbox';
import React from 'react';

const FilterDialog: React.FC = () => {

  const [isChecked, setChecked] = React.useState(false);

  const mockData = [
    { id: 1, label: 'All', name: 'all' },
    { id: 2, label: 'All', name: 'all' },
    { id: 3, label: 'All', name: 'all' },
    { id: 4, label: 'All', name: 'all' },
    { id: 5, label: 'All', name: 'all' },
    { id: 6, label: 'All', name: 'all' },
    { id: 7, label: 'All', name: 'all' },
    { id: 8, label: 'All', name: 'all' },
    { id: 10, label: 'All', name: 'all' },
    { id: 11, label: 'All', name: 'all' },
    { id: 12, label: 'All', name: 'all' },
    { id: 13, label: 'All', name: 'all' },
    { id: 14, label: 'All', name: 'all' },
    { id: 15, label: 'All', name: 'all' },
    { id: 16, label: 'All', name: 'all' },
    { id: 17, label: 'All', name: 'all' },
    { id: 18, label: 'All', name: 'all' },
    { id: 19, label: 'All', name: 'all' },
    { id: 20, label: 'All', name: 'all' },
    { id: 21, label: 'All', name: 'all' },
    { id: 22, label: 'All', name: 'all' },
  ];

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
          {mockData.map((item) =>
            <li key={item.id}>
              <Checkbox label={item.label} name={item.name} isChecked={isChecked} onChange={onCheckBoxChange}/>
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
