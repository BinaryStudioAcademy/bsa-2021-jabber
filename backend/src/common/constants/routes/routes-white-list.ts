import { AuthApiPath, ApiPath, PodcastsApiPath, EpisodesApiPath, HttpMethod } from '~/common/enums/enums';

let ROUTES_WHITE_LIST = new Map([
  [`${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`, [HttpMethod.GET, HttpMethod.POST]],
  [`${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`, [HttpMethod.GET, HttpMethod.POST]],
  [`${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}`, [HttpMethod.GET]],
  [`${ApiPath.EPISODES}${EpisodesApiPath.ROOT}`, [HttpMethod.GET]],
]);

export { ROUTES_WHITE_LIST };
