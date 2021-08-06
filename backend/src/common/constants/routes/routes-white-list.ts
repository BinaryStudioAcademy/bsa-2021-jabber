import { AuthApiPath, ApiPath, PodcastsApiPath, EpisodesApiPath, HttpMethod } from '~/common/enums/enums';

const ROUTES_WHITE_LIST = [
  {
    path: `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    allowedMethods: [HttpMethod.GET, HttpMethod.POST],
  },
  {
    path: `${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    allowedMethods: [HttpMethod.GET, HttpMethod.POST],
  },
  {
    path: `${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}`,
    allowedMethods: [HttpMethod.GET],
  },
  {
    path: `${ApiPath.EPISODES}${EpisodesApiPath.ROOT}`,
    allowedMethods: [HttpMethod.GET],
  },
];

export { ROUTES_WHITE_LIST };
