import { DeepMap, FieldError, Control, FieldValues } from 'react-hook-form';
import { ButtonColor, EpisodePayloadKey } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { useCallback, useFieldArray } from 'hooks/hooks';
import { DEFAULT_SHOWNOTE_PAYLOAD } from '../../common/constants';
import ShownoteInput from '../shownote-input/shownote-input';
import styles from './styles.module.scss';

type Props = {
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
};

const ShownoteInputList: React.FC<Props> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: EpisodePayloadKey.SHOWNOTES,
  });

  const handleAddShownote = useCallback((): void => {
    append(DEFAULT_SHOWNOTE_PAYLOAD);
  }, []);

  return (
    <>
      <div className={styles.title}>
        Shownotes
        <Button
          label="Add"
          buttonColor={ButtonColor.LIGHT_PINK}
          onClick={handleAddShownote}
        />
      </div>
      <ul className={styles.inputList}>
        {fields.map((item, index) => (
          <ShownoteInput
            key={item.id}
            index={index}
            control={control}
            errors={errors}
            onRemove={remove}
          />
        ))}
      </ul>
    </>
  );
};

export default ShownoteInputList;
