import { Path, FieldValues } from 'react-hook-form';
import { Genre, GenresFilter, PodcastLoadFilter } from 'common/types/types';
import { ButtonType, ButtonColor } from 'common/enums/enums';
import { useAppForm, useState } from 'hooks/hooks';
import { Button, Checkbox } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  genres: Genre[];
  onSetGenres: (data: GenresFilter) => void;
  currentState: PodcastLoadFilter;
};

const PodcastFilter: React.FC<Props> = ({
  genres,
  onSetGenres,
  currentState,
}) => {
  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: { genresFilter: new Array(genres.length).fill(false) },
  });
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleCancel = (): void => {
    const currentValues = new Array<boolean>(genres.length).fill(false).map((_arg, i) => currentState.genres.includes(genres[i].id));
    reset({ genresFilter: currentValues });
    setIsFormVisible(false);
  };

  const handleClearGenres = (): void => {
    reset({ genresFilter: new Array(genres.length).fill(false) });
  };

  const handleSetGenres = (e?: React.BaseSyntheticEvent): void => {
    setIsFormVisible(false);
    handleSubmit(onSetGenres)(e);
  };

  const handleShowForm = (): void => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className={styles.podcastFilter}>
      <button onClick={handleShowForm} className={styles.btnFilter}></button>
      {isFormVisible && (
        <div className={styles.podcastFilterBox}>
          <div className={styles.podcastFilterTop}>
            <span className={styles.podcastFilterTitle}>Filter</span>
            <button className={styles.btnClear} onClick={handleClearGenres}>
              Clear all
            </button>
          </div>
          <form onSubmit={handleSetGenres}>
            <fieldset className={styles.fieldset}>
              <ul className={styles.genresList}>
                {genres.map((genre, index) => (
                  <li key={genre.id} className={styles.genreItem}>
                    <Checkbox
                      label={genre.name}
                      name={`genresFilter.${index}` as Path<FieldValues>}
                      control={control}
                    />
                  </li>
                ))}
              </ul>
              <div className={styles.btnsWrapper}>
                <Button label="Apply" type={ButtonType.SUBMIT} />
                <Button
                  className={styles.btnCancel}
                  buttonColor={ButtonColor.LIGHT_PINK}
                  label="Cancel"
                  type={ButtonType.BUTTON}
                  onClick={handleCancel}
                />
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
};

export default PodcastFilter;
