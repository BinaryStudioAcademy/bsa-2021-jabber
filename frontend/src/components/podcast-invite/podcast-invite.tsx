import { useParams, useDispatch, useEffect } from 'hooks/hooks';
import { Loader } from 'components/common/common';
import { podcast as podcastActions } from 'store/actions';
import { PageParams } from './common/types/types';

const PodcastInvite: React.FC = () => {
  const dispatch = useDispatch();
  const { code } = useParams<PageParams>();

  useEffect(() => {
    dispatch(podcastActions.podcastInvite(code));
  }, []);

  return (
    <Loader />
  );
};

export default PodcastInvite;
