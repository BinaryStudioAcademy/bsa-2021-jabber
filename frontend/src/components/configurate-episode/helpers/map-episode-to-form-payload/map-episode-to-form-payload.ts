import { Episode, EpisodeFormPayload } from 'common/types/types';
import { mapShownoteToFormPayload } from '../map-shownote-to-form-payload/map-shownote-to-form-payload';

const mapEpisodeToFormPayload = (episode: Episode): EpisodeFormPayload => ({
  name: episode.name,
  description: episode.description,
  record: null,
  type: episode.type,
  image: null,
  status: episode.status,
  shownotes: episode.shownotes.map(mapShownoteToFormPayload),
});

export { mapEpisodeToFormPayload };
