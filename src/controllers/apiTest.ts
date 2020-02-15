import express, { Request, Response } from 'express';

import Controller from '../interfaces/controller';

export default class ApiController implements Controller {
  public path = '/.netlify/functions/server/api';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.path, (req: Request, res: Response) => res.json({ api: 'apiTest' }));
  }
}
