import 'source-map-support/register';
import 'dotenv/config';
import serverless from 'serverless-http';
import App from '../app';
import validateEnv from './utils/validateEnv';
import IndexController from './index/indexController';
import ApiController from './api/apiController';

validateEnv();

const { app } = App.of([new IndexController(), new ApiController()]);
export const handler = serverless(app);
