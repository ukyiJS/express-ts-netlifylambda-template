import 'source-map-support/register';
import serverless from 'serverless-http';
import App from '../app';
import validateEnv from './utils/validateEnv';
import IndexController from './controllers';
import ApiController from './controllers/apiTest';
import log, { READY } from './utils/log';

validateEnv();

const { app, port } = App.of([new IndexController(), new ApiController()]);
const listenLog = () => log(READY)(`Listening on http://localhost:${port}`, 'server', 'green');

app.listen(port, listenLog);

export const handler = serverless(app);
