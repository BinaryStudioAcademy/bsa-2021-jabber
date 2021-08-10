import { Episode, EpisodeFormPayload } from 'common/types/types';

const mapEpisodeToFormPayload = (episode: Episode): EpisodeFormPayload => ({
  name: episode.name,
  description: episode.description,
  record: null,
  type: episode.type,
  image: null,
});

export { mapEpisodeToFormPayload };
