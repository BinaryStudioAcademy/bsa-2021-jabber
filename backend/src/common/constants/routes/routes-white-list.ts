import { AuthApiPath, ApiPath } from '~/common/enums/enums';

const ROUTES_WHITE_LIST = [
  `${ApiPath.AUTH}${AuthApiPath.ROOT}`,
  `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
  `${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { ROUTES_WHITE_LIST };
