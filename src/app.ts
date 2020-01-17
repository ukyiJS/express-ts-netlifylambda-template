import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import Controller from './interfaces/controller';
import errorMiddleware from './middleware/error';
import notFoundMiddleware from './middleware/notFound';
import proxy from 'http-proxy-middleware';
import { INFO } from './utils/log';

class App {
  public app: Application;

  public static of(controllers: Controller[]) {
    return new App(controllers);
  }

  constructor(controllers: Controller[]) {
    this.app = express();

    this.listen();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    // this.connectToTheDatabase();
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(process.env.PORT, () => INFO(`Server listening on http://localhost:${process.env.PORT}`));
  }

  private initializeMiddlewares() {
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('view engine', 'html');
    this.app.set('views', path.join(__dirname, 'views'));

    this.app.use(proxy('/api/**', { target: '/.netlify/functions/server' }));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeErrorHandling() {
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => this.app.use('/', controller.router));
  }

  // private connectToTheDatabase() {
  //   const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
  //   mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  // }
}

export default App;
