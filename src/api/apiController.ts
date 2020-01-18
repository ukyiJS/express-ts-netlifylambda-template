import express, { Request, Response } from 'express';

import Controller from '../interfaces/controller';

class ApiController implements Controller {
  public path = '/.netlify/functions/server/api';

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.render);
  }

  private render(req: Request, res: Response) {
    res.json({ api: 'apiTest' });
  }
}

export default ApiController;
