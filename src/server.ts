import 'source-map-support/register';
import 'dotenv/config';
import App from './app';
import serverless from 'serverless-http';
import validateEnv from './utils/validateEnv';
import indexController from './index/indexController';
import apiController from './api/apiController';

validateEnv();

const app = App.of([new indexController(), new apiController()]).app;
export const handler = serverless(app);
