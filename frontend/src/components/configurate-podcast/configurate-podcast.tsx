import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions } from 'store/actions';
import { PodcastEditPayload, PodcastCreatePayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { ConfiguratePodcastForm } from './components/components';
import styles from './styles.module.scss';
import { parserForEditPodcast } from '../../helpers/helpers';

const ConfiguratePodcast: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { editablePodcast } = useAppSelector(({ configuratePodcast }) => ({
    editablePodcast: configuratePodcast.editablePodcast,
  }));

  const isEdit = Boolean(id);

  const handleCreatePodcast = (payload: PodcastCreatePayload): void => {
    dispatch(configuratePodcastActions.create(payload));
  };

  const handleEditPodcast = (payload: PodcastEditPayload): void => {
    dispatch(configuratePodcastActions.edit( { id: Number(id), payload } ));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(configuratePodcastActions.loadPodcast(Number(id)));
    }
  }, []);

  return (
    <div className={styles.podcast}>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Podcast {id ?? ''}
      </h2>
      {(isEdit)
        ? editablePodcast && <ConfiguratePodcastForm
          onSubmit={handleEditPodcast}
          payload={parserForEditPodcast(editablePodcast)}/>
        : <ConfiguratePodcastForm onSubmit={handleCreatePodcast}/>
      }
    </div>
  );
};

export default ConfiguratePodcast;
