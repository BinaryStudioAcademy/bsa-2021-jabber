import { WhiteRoute } from '~/common/types/types';

const checkIsRouteWhite = (splitedWhiteRoute: string[], splitedRequestRoute: string[]): boolean => {
  for (let i = 0; i < splitedWhiteRoute.length; i++) {
    const isRouteWhite = splitedRequestRoute.some((requestRouteItem) => requestRouteItem === splitedWhiteRoute[i]);
    if (isRouteWhite) return true;
  }
  return false;
};

const checkIsMethodAllowed = (allowedMethods: string[], requestMethod: string):boolean => {
  return allowedMethods.some((method) => method === requestMethod);
};

const checkUserAccess = (
  routesWhiteList:WhiteRoute[],
  requestRoute: string,
  requestMethod: string,
):boolean => {
  const splitedRequestRoute = requestRoute.split('/').filter((e) => e);
  for (let i = 0; i < routesWhiteList.length; i++) {
    const splitedWhiteRoute = routesWhiteList[i].path.split('/').filter((e) => e);
    const isRouteWhite = checkIsRouteWhite(splitedWhiteRoute, splitedRequestRoute);
    const isMethodAllowed = checkIsMethodAllowed(routesWhiteList[i].allowedMethods, requestMethod);
    if (isRouteWhite && isMethodAllowed) return true;
  }
  return false;
};

export { checkUserAccess };
