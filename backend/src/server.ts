import { join } from 'path';
import express, { json, urlencoded } from 'express';
import Knex from 'knex';
import passport from 'passport';
import { Model } from 'objection';
import { ENV, ApiPath } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import { logger, passport as passportService } from '~/services/services';
import {
  setTraceId,
  logRequest,
  handleError,
  authorization as authorizationMiddleware,
} from '~/middlewares/middlewares';
import { ROUTES_WHITE_LIST } from './common/constants/constants';
import knexConfig from '../knexfile';

const app = express();

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.use(setTraceId);
app.use(logRequest);
app.use(json({ limit: '100mb' }));
app.use(urlencoded({ extended: true, limit: '100mb' }));

app.use(passport.initialize());
passportService.init(passport);
app.use(
  ENV.API.V1_PREFIX + ApiPath.AUTH,
  authorizationMiddleware(ROUTES_WHITE_LIST),
);

initApi(app);

app.use(express.static(join(__dirname, '../public')));
app.use('*', (_req, res) => {
  return res.sendFile(join(__dirname, '../public', 'index.html'));
});

app.use(handleError);

const server = app.listen(ENV.APP.SERVER_PORT, () => {
  logger.log(
    `Listening to connections on Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});

export { server };
