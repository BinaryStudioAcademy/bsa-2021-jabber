import { config } from 'dotenv';
import { AppEnvironment } from '~/common/enums/app/app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_DIALECT,
  CLOUDINARY_URL,
  SECRET_KEY,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: PORT,
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
  UPLOAD: {
    API_URL: CLOUDINARY_URL,
  },
  JWT: {
    SECRET: SECRET_KEY,
  },
};

export { ENV };
