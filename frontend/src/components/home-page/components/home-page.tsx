import { useState } from 'hooks/hooks';
import Input from '../../common/input/input';
import Podcast from '../../common/podcast/podcast';
import FilterDialog from './filter-dialog';
import styles from './../styles.module.scss';
import MenuButton from '../../common/menu-button/button-menu';
import temporaryCoverImage from '../../../assets/img/temporary-cover.jpg';

const HomePage: React.FC = () => {

  const podcastsCount = 15;

  const [showFilterDialog, setShowFilterDialog] = useState(false);

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
        <MenuButton onClick={onShowFilterDialog} label="All podcasts"/>
        {showFilterDialog && <FilterDialog />}
      </div>
      <div className={styles.podcastsBlock}>
        {[...Array(podcastsCount)].map((item, index) => {
          return <Podcast key={index} cover={temporaryCoverImage} albumTitle="Chill out mixed compilation Chill out" singerName="Summer session Summer session"/>;
        })}
      </div>
    </div>
  );
};

export default HomePage;
