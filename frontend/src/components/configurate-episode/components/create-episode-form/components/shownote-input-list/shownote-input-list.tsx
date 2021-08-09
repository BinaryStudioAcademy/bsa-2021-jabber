import { DeepMap, FieldError, Control, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  ButtonColor,
  EpisodeCreatePayloadKey,
  InputType,
  ShownotePayloadKey,
} from 'common/enums/enums';
import { Button, Input } from 'components/common/common';
import { useCallback, useFieldArray } from 'hooks/hooks';
import { DEFAULT_SHOWNOTE_PAYLOAD } from '../../common/constants';
import styles from './styles.module.scss';

type Props = {
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
};

const ShownoteInputList: React.FC<Props> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: EpisodeCreatePayloadKey.SHOWNOTES,
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
          <li key={item.id} className={styles.listItem}>
            <Input
              type={InputType.TEXT}
              label="Name"
              placeholder="Enter show-note name"
              name={
                `${EpisodeCreatePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.NAME}` as 'shownotes[x].name'
              }
              control={control}
              errors={errors}
            />
            <Input
              type={InputType.NUMBER}
              label="Timestamp"
              placeholder="Enter show-note timestamp"
              name={
                `${EpisodeCreatePayloadKey.SHOWNOTES}[${index}].${ShownotePayloadKey.TIMESTAMP}` as 'shownotes[x].timestamp'
              }
              control={control}
              errors={errors}
            />
            <div className={styles.errorWrapper}>
              <ErrorMessage
                errors={errors}
                name={`${EpisodeCreatePayloadKey.SHOWNOTES}[${index}]`}
              />
            </div>
            <Button
              label="Delete"
              buttonColor={ButtonColor.LIGHT_PINK}
              onClick={(): void => remove(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShownoteInputList;
