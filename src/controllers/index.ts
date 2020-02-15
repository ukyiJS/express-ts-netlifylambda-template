import express, { Request, Response } from 'express';

import Controller from '../interfaces/controller';

export default class IndexController implements Controller {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, (req: Request, res: Response) => res.render('index.html'));
  }
}
