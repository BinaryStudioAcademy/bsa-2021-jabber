import { WhiteRoute } from '~/common/types/types';

const checkIsRouteWhite = (splitedWhiteRoute: string[], splitedRequestRoute: string[]) => {
  let isRouteWhite = false;
  splitedWhiteRoute.forEach(whiteRouteItem => {
    if (splitedRequestRoute.indexOf(whiteRouteItem) !== -1) isRouteWhite = true
  })
  return isRouteWhite;
}

const checkIsMethodAllowed = (allowedMethods: string[], requestMethod: string) => {
  return allowedMethods.some((method) => method === requestMethod)
}

const checkUserAccess = (
  routesWhiteList:WhiteRoute[],
  requestRoute: string,
  requestMethod: string
):Boolean => {
  const splitedRequestRoute = requestRoute.split('/').filter(e => e);
  for (let i = 0; i < routesWhiteList.length; i++) {
    const splitedWhiteRoute = routesWhiteList[i].path.split('/').filter(e => e);
    let isRouteWhite = checkIsRouteWhite(splitedWhiteRoute, splitedRequestRoute);
    let isMethodAllowed = checkIsMethodAllowed(routesWhiteList[i].allowedMethods, requestMethod)
    if (isRouteWhite && isMethodAllowed) return true;
  }
  return false;
}

export { checkUserAccess }
