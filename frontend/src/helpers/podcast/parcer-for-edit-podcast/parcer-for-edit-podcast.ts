import { Podcast, PodcastEditPayload } from 'common/types/types';
import { PodcastEditPayloadKey } from 'common/enums/enums';

const parserForEditPodcast = (podcast: Podcast): PodcastEditPayload => {
  return {
    [PodcastEditPayloadKey.NAME]: podcast[PodcastEditPayloadKey.NAME],
    [PodcastEditPayloadKey.DESCRIPTION]: podcast[PodcastEditPayloadKey.DESCRIPTION],
    [PodcastEditPayloadKey.USER_ID]: podcast[PodcastEditPayloadKey.USER_ID],
  };
};

export { parserForEditPodcast };
