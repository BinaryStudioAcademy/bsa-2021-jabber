import { useDispatch, useParams } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeFormPayload } from 'common/types/types';
import { CreateEpisodeForm } from './components/components';
import { PageParams } from './common/types/types';
import styles from './styles.module.scss';

const ConfigurateEpisode: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const isEdit = Boolean(id);

  const handleCreateEpisode = (payload: EpisodeFormPayload): void => {
    dispatch(configurateEpisodeActions.createEpisode(payload));
  };

  return (
    <div className={styles.episode}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Episode {id ?? ''}
      </h2>
      <CreateEpisodeForm onSubmit={handleCreateEpisode} />
    </div>
  );
};

export default ConfigurateEpisode;
