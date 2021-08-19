import { Genre } from 'common/types/types';
import { ButtonType, ButtonColor } from 'common/enums/enums';
import { Button, Checkbox } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  genres: Genre[];
};

// disabled={isFormDisabled}

const PodcastFilter: React.FC<Props> = ({ genres }) => {
  return (
    <ul className={styles.categoriesList}>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <div className={styles.btnsWrapper}>
            {genres.map((genre) => (
              <Checkbox key={genre.id} label={genre.name} name={genre.key} />
            ))}
            <Button
              className={styles.btnSave}
              label="Save"
              type={ButtonType.SUBMIT}
            />
            <Button
              className={styles.btnCancel}
              buttonColor={ButtonColor.LIGHT_PINK}
              label="Cancel"
              type={ButtonType.SUBMIT}
            />
          </div>
        </fieldset>
      </form>
    </ul>
  );
};

export default PodcastFilter;
