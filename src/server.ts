import 'source-map-support/register';
import 'dotenv/config';
import App from './app';
import serverless from 'serverless-http';
import validateEnv from './utils/validateEnv';
import indexController from './index/controller';

validateEnv();

const app = App.of([new indexController()]).app;
export const handler = serverless(app);
