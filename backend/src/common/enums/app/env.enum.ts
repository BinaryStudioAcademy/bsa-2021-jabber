import { config } from 'dotenv';
import { AppEnvironment } from '~/common/enums/app/app-environment.enum';

config();

const {
  NODE_ENV,
  APP_SERVER_PORT,
  DATABASE_URL,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_DIALECT,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: APP_SERVER_PORT ?? 3001,
  },
  DB: {
    CONNECTION_STRING: DATABASE_URL,
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
    DIALECT: DB_DIALECT,
  },
  API: {
    V1_PREFIX: '/api/v1/',
  },
};

export { ENV };
