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

export { development, test };
