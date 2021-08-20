import {
  DeepMap,
  FieldError,
  Control,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';
import { ButtonColor, EpisodePayloadKey } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { useCallback, useFieldArray } from 'hooks/hooks';
import ShownoteInput from './components/shownote-input/shownote-input';
import { DEFAULT_SHOWNOTE_PAYLOAD } from '../../common/constants';
import styles from './styles.module.scss';

type Props = {
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  setValue: UseFormSetValue<FieldValues>;
};

const TimeNavigation: React.FC<Props> = ({ control, errors, setValue }) => {
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: EpisodePayloadKey.SHOWNOTES,
  });

  const handleAddShownote = useCallback((): void => {
    prepend(DEFAULT_SHOWNOTE_PAYLOAD);
  }, []);

  return (
    <div className={styles.timeNavigation}>
      <h3 className={styles.title}>Time navigation</h3>
      <Button
        label="Add time navigation"
        buttonColor={ButtonColor.LIGHT_PINK}
        onClick={handleAddShownote}
        className={styles.addButton}
      />
      <ul className={styles.inputList}>
        {fields.map((item, index) => (
          <ShownoteInput
            key={item.id}
            index={index}
            onRemove={remove}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        ))}
      </ul>
    </div>
  );
};

export default TimeNavigation;
