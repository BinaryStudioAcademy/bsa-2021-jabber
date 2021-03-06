import { Path, FieldValues } from 'react-hook-form';
import { Genre, GenresFilter, PodcastLoadFilter } from 'common/types/types';
import { ButtonType, ButtonColor } from 'common/enums/enums';
import { useAppForm, useEffect } from 'hooks/hooks';
import { Button, Checkbox, Modal } from 'components/common/common';
import { getCurrentValues } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  genres: Genre[];
  onApply: (data: GenresFilter) => void;
  onCancel: () => void;
  currentState: PodcastLoadFilter;
  isOpen: boolean;
};

const PodcastFilterPopup: React.FC<Props> = ({
  genres,
  onApply,
  onCancel,
  currentState,
  isOpen,
}) => {
  const currentValues = getCurrentValues(currentState, genres);

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: { genresFilter: currentValues },
  });

  useEffect(() => {
    isOpen && reset({ genresFilter: currentValues });
  }, [isOpen]);

  return (
    <Modal isShowModal={isOpen} onCloseModal={onCancel}>
      <div className={styles.podcastFilter}>
        <div className={styles.podcastFilterTitle}>Filter</div>
        <form onSubmit={handleSubmit(onApply)}>
          <fieldset className={styles.fieldset}>
            <ul className={styles.genresList}>
              {genres.map((genre) => (
                <li key={genre.id} className={styles.genreItem}>
                  <Checkbox
                    label={genre.name}
                    name={`genresFilter.${genre.key}` as Path<FieldValues>}
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
                onClick={onCancel}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </Modal>
  );
};

export default PodcastFilterPopup;
