import { Episode, EpisodeFormPayload } from 'common/types/types';
import { EpisodeStatus } from 'common/enums/enums';
import { mapShownoteToFormPayload } from '../map-shownote-to-form-payload/map-shownote-to-form-payload';

const mapEpisodeToFormPayload = (episode: Episode, liveRecordDataUrl: string | null): EpisodeFormPayload => ({
  name: episode.name,
  description: episode.description,
  record: null,
  type: episode.type,
  image: null,
  status: liveRecordDataUrl ? EpisodeStatus.PUBLISHED : episode.status,
  shownotes: episode.shownotes.map(mapShownoteToFormPayload),
  recordDataUrl: liveRecordDataUrl ?? episode.record?.fileUrl ?? null,
});

export { mapEpisodeToFormPayload };
