import { join, resolve } from 'path';
import express, { json, urlencoded } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import { logger } from '~/services/services';
import { setTraceId, logRequest, handleError } from '~/middlewares/middlewares';
import knexConfig from '../knexfile';

const app = express();

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.use(setTraceId);
app.use(logRequest);
app.use(json());
app.use(urlencoded({ extended: true }));

initApi(app);

app.use(express.static(join(resolve(), '../public')));
app.use('*', (_req, res) => {
  return res.sendFile(join(resolve(), '../public', 'index.html'));
});

app.use(handleError);

const server = app.listen(ENV.APP.SERVER_PORT, () => {
  logger.log(
    `Listening to connections on Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});

export { server };
