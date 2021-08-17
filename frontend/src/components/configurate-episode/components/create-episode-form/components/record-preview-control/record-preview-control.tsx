import {
  FieldValues,
  Path,
  Control,
  useController,
} from 'react-hook-form';
import { useState } from 'hooks/hooks';
import { ErrorMessage } from '@hookform/error-message';
import { getFileExtensions } from 'helpers/helpers';
import {
  InputType,
  FileExtension,
} from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  name: Path<FieldValues>;
  control: Control;
  errors: FieldValues;
};

const acceptAudioExtension = getFileExtensions(
  FileExtension.MP3,
  FileExtension.WAV,
);

const RecordPreviewControl: React.FC<Props> = ({
  name,
  control,
  errors,
}) => {
  const { field } = useController({ name, control });

  const [currentRecord, setRecord] = useState<string | undefined>('');

  const handleChange = (evt: React.ChangeEvent<FieldValues>): void => {
    const [file] = evt.target.files ?? [];
    const hasRecord = Boolean(file);
    
    if(!hasRecord){
      return;
    }

    setRecord(file.name);
    field.onChange(evt.target.files);
  };

  return (
    <>
      <label className={styles.inputWrapper}>
        <label className={styles.recordLabel}>
          Upload record
          <input
            {...control.register(name)}
            accept={acceptAudioExtension}
            type={InputType.FILE}
            className="visually-hidden"
            onChange={handleChange}
          />
        </label>
        <span className={styles.recordPreview}>{currentRecord}</span>
      </label>
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
};

export default RecordPreviewControl;
