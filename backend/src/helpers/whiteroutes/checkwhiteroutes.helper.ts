import { WhiteRoute } from '~/common/types/types';
import { HttpMethod } from '~/common/enums/enums';

const checkUserAccess = (
  routesWhiteList: WhiteRoute[],
  requestRoute: string,
  requestMethod: string,
): boolean => {
  if (requestMethod === HttpMethod.GET) return true;

  for (let i = 0; i < routesWhiteList.length; i++) {
    const isRouteWhite = routesWhiteList[i].path === requestRoute;
    const isMethodAllowed = routesWhiteList[i].allowedMethods.some((method) => method === requestMethod);
    if (isRouteWhite && isMethodAllowed) return true;
  }

  return false;
};

export { checkUserAccess };
