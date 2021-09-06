import { useParams, useDispatch, useEffect } from 'hooks/hooks';
import { Loader } from 'components/common/common';
import { playlist as playlistActions } from 'store/actions';
import { PageParams } from './common/types/types';

const PlaylistInvite: React.FC = () => {
  const dispatch = useDispatch();
  const { code } = useParams<PageParams>();

  useEffect(() => {
    dispatch(playlistActions.playlistInvite(code));
  }, []);

  return (
    <Loader />
  );
};

export default PlaylistInvite;
