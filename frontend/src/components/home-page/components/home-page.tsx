import React from 'react';
import Input from '../../common/input/input';
import Podcast from './podcast';
import FilterDialog from './filter-dialog';
import styles from './../styles.module.scss';
import MenuButton from './button-menu';

const HomePage: React.FC = () => {

  const [showFilterDialog, setShowFilterDialog] = React.useState(false);

  const onShowFilterDialog = ():void => {
    setShowFilterDialog(!showFilterDialog);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void  => {
    const text = event.target.value;
    console.warn(text);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.searchBlock}>
        <Input
          value="Search podcast..."
          onChange={handleSearchInput}
          name="search"
          label=""
        />
      </div>
      <div className={styles.filterBlock}>
        <MenuButton onClick={onShowFilterDialog} className={styles.filterButton} label="All podcasts"/>
        {showFilterDialog && <FilterDialog />}
      </div>
      <div className={styles.podcastsBlock}>
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
        <Podcast />
      </div>

    </div>
  );
};

export default HomePage;
