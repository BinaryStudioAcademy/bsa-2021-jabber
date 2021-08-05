import { RequestHandler } from 'express';
import { appAsyncStorage, token } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';
import { AppAsyncStorageKey } from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';

const setTraceId: RequestHandler = async (req, _res, next) => {
  const [, bearerToken] = <string[]>req.headers.authorization?.split(' ');
  const payload = token.decode<TokenPayload | null>(bearerToken);
  const traceId = payload?.userId ?? getRandomId();
  const store = new Map().set(AppAsyncStorageKey.TRACE_ID, traceId);

  return appAsyncStorage.run(store, () => {
    return next();
  });
};

export { setTraceId };
