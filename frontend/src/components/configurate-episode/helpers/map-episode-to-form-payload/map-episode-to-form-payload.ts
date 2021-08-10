import { Episode, EpisodeFormPayload } from 'common/types/types';
import { EpisodeStatus } from 'common/enums/enums';

const mapEpisodeToFormPayload = (episode: Episode): EpisodeFormPayload => ({
  name: episode.name,
  description: episode.description,
  record: null,
  type: episode.type,
  image: null,
  status: EpisodeStatus.STAGING,
  shownotes: [],
});

export { mapEpisodeToFormPayload };
