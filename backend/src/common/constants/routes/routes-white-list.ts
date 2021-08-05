import { AuthApiPath, ApiPath, PodcastsApiPath, EpisodesApiPath } from '~/common/enums/enums';

const ROUTES_WHITE_LIST = [
  `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
  `${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
  `${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}`,
  `${ApiPath.EPISODES}${EpisodesApiPath.ROOT}`,
];

export { ROUTES_WHITE_LIST };
