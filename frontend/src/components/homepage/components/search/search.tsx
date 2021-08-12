import Input from 'components/common/input/input';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_SEARCH_PAYLOAD } from './common/constants';
import { IconName } from 'common/enums/ui/ui';
import { FormEvent } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  onChange: (evt: React.ChangeEvent<HTMLFormElement>) => void;
};

const Search: React.FC<Props> = ({ onChange }) => {
  const {
    control,
    errors,
  } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
    modeAction: FormEvent.ON_CHANGE,
  });

  return (
    <form
      onChange={onChange}
    >
      <div className={styles.searchBlock}>
        <Input
          label=""
          name="search"
          placeholder="Search podcasts..."
          control={control}
          errors={errors}
          icon={IconName.SEARCH}
        />
      </div>
    </form>);
};

export default Search;
