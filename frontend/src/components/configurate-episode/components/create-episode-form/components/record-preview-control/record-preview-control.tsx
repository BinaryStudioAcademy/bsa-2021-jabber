import {
  FieldValues,
  Path,
  Control,
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
  fileUrl: string | null;
};

const acceptAudioExtension = getFileExtensions(
  FileExtension.MP3,
  FileExtension.WAV,
);

const RecordPreviewControl: React.FC<Props> = ({
  name,
  control,
  errors,
  fileUrl,
}) => {
  const [currentRecord, setRecord] = useState<string>('');

  const handleChange = (evt: React.ChangeEvent<FieldValues>): void => {
    const [file] = evt.target.files ?? [];
    const hasRecord = Boolean(file);

    if (!hasRecord) {
      setRecord('');
      return;
    }
    setRecord(file.name);
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
        <span className={styles.recordPreview}>{currentRecord || (fileUrl ? 'current episode' : '')}</span>
      </label>
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
};

export default RecordPreviewControl;
