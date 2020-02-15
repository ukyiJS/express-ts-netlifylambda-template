import bodyParser from 'body-parser';
import 'colors';
import cors from 'cors';
import 'dotenv/config';
import ejs from 'ejs';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import NotFoundException from './src/exceptions/notFoundException';
import Controller from './src/interfaces/controller';
import errorMiddleware from './src/middleware/error';
import log, { ERROR, SUCCESS, WARN } from './src/utils/log';

export default class App {
  private static private: symbol = Symbol('private');
  public app: Application;
  public port: string;

  public static of(controllers: Controller[]) {
    return new App(controllers, this.private);
  }

  constructor(controllers: Controller[], checker: symbol) {
    if (checker !== App.private) throw 'Use App.of()!'.red;

    this.app = express();
    this.port = process.env.PORT ?? '3000';

    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandling();
    this.connectToTheDatabase();
    Object.freeze(this);
  }

  private initMiddlewares() {
    this.app.engine('html', ejs.renderFile);
    this.app.set('view engine', 'html');
    this.app.set('views', path.join(__dirname, 'src/views'));

    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, 'src', 'assets')));
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach(controller => this.app.use('/', controller.router));
  }

  private initErrorHandling() {
    this.app.use((req, res, next) => errorMiddleware(new NotFoundException(req), req, res, next));
    this.app.use(errorMiddleware);
    this.app.get('/favicon.ico', (req, res) => res.status(204));
  }

  private connectToTheDatabase() {
    this.connectMongoDB();

    mongoose.connection.on('connected', () => log(SUCCESS)('MongoDB connected', 'connect'));
    mongoose.connection.on('error', error => log(ERROR)(error.toString()));
    process.on('SIGINT', this.closeMongoDB).on('SIGTERM', this.closeMongoDB);
  }

  private connectMongoDB() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  }

  private closeMongoDB() {
    mongoose.connection.close(() => {
      log(WARN)('MongoDB close', 'close');
      process.exit(0);
    });
  }
}
