import { config } from 'dotenv';

config();

const { USER, PASSWORD, DATABASE, HOST, dialect } = process.env;

const development = {
  username: USER,
  password: PASSWORD,
  database: DATABASE,
  host: HOST,
  dialect
};

const test = {
  use_env_variable: 'CONNECTION_STRING',
  dialect
};

const production = {
  use_env_variable: 'DATABASE_URL',
  dialect
};

export { development, test };
