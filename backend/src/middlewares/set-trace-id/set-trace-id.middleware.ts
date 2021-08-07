import { RequestHandler } from 'express';
import { appAsyncStorage, token } from '~/services/services';
import { getRandomId, extractAuthToken } from '~/helpers/helpers';
import { AppAsyncStorageKey } from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';

const setTraceId: RequestHandler = async (req, _res, next) => {
  const bearerToken = extractAuthToken(req.headers.authorization);

  const payload = bearerToken
    ? token.decode<TokenPayload | null>(bearerToken)
    : null;

  const traceId = payload?.userId ?? getRandomId();
  const store = new Map().set(AppAsyncStorageKey.TRACE_ID, traceId);

  return appAsyncStorage.run(store, () => {
    return next();
  });
};

export { setTraceId };
