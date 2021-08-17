import { FormEvent, IconName, InputType } from 'common/enums/enums';
import { PodcastSearchPayload } from 'common/types/types';
import { Input } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_PODCAST_SEARCH_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onChange: (payload: PodcastSearchPayload) => void;
};

const Search: React.FC<Props> = ({ onChange }) => {
  const { control, errors, getValues } = useAppForm({
    defaultValues: DEFAULT_PODCAST_SEARCH_PAYLOAD,
    modeAction: FormEvent.ON_CHANGE,
  });

  const handleChange = (): void => {
    onChange(getValues() as PodcastSearchPayload);
  };

  return (
    <form onChange={handleChange}>
      <div className={styles.searchBlock}>
        <Input
          label=""
          type={InputType.SEARCH}
          name="search"
          placeholder="Search podcasts..."
          control={control}
          errors={errors}
          icon={IconName.SEARCH}
        />
      </div>
    </form>
  );
};

export default Search;
