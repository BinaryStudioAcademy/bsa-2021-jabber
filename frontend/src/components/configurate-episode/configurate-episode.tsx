import { useDispatch } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeFormPayload } from 'common/types/types';
import { CreateEpisodeForm } from './components/components';
import { getFileExtensions } from 'helpers/helpers';
import { FileExtension } from 'common/enums/enums';

const ConfigurateEpisode: React.FC = () => {
  const dispatch = useDispatch();

  const handleCreateEpisode = (payload: EpisodeFormPayload): void => {
    dispatch(configurateEpisodeActions.createEpisode(payload));
  };

  const acceptAudioExtension = getFileExtensions(
    FileExtension.MP3,
    FileExtension.WAV,
  );

  return (
    <div>
      <CreateEpisodeForm
        onSubmit={handleCreateEpisode}
        acceptAudioExtension={acceptAudioExtension}
      />
    </div>
  );
};

export default ConfigurateEpisode;
