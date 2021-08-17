import Input from 'components/common/input/input';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_PODCAST_SEARCH_PAYLOAD } from './common/constants';
import { IconName, InputType } from 'common/enums/ui/ui';
import { FormEvent } from 'common/enums/enums';
import { FieldValues, UnpackNestedValue } from 'react-hook-form';
import styles from './styles.module.scss';

type Props = {
  onChange: (evt: UnpackNestedValue<FieldValues>) => void;
  value: string;
};

const Search: React.FC<Props> = ({ onChange, value }) => {
  const { control, errors, getValues } = useAppForm({
    defaultValues: DEFAULT_PODCAST_SEARCH_PAYLOAD,
    modeAction: FormEvent.ON_CHANGE,
  });

  const handleChange = (): void => {
    onChange(getValues());
  };

  return (
    <form onChange={handleChange}>
      <div className={styles.searchBlock}>
        <Input
          label=""
          type={InputType.TEXT}
          name="search"
          placeholder="Search podcasts..."
          control={control}
          errors={errors}
          icon={IconName.SEARCH}
          value={value}
        />
      </div>
    </form>
  );
};

export default Search;
