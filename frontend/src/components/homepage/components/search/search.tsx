import { FormEvent, IconName, InputType } from 'common/enums/enums';
import { PodcastSearchPayload } from 'common/types/types';
import { Input } from 'components/common/common';
import { useAppForm, useEffect } from 'hooks/hooks';
import { DEFAULT_PODCAST_SEARCH_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onChange: (payload: PodcastSearchPayload) => void;
  currentState: string;
};

const Search: React.FC<Props> = ({ onChange, currentState }) => {
  const { control, errors, getValues, reset } = useAppForm({
    defaultValues: DEFAULT_PODCAST_SEARCH_PAYLOAD,
    modeAction: FormEvent.ON_CHANGE,
  });

  useEffect(() => {
    reset({ search: currentState });
  }, [currentState]);

  const handleChange = (): void => {
    onChange(getValues() as PodcastSearchPayload);
  };

  const handleSubmit = (evt: React.ChangeEvent<HTMLFormElement>): void => {
    evt.preventDefault();
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
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
