import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller';
import DataDoesNotExistException from '../exceptions/dataDoesNotExistException';

class apiController implements Controller {
  public path = '/.netlify/functions/server/api';

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.example);
  }

  private example(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if (id) res.json({ api: id, status: res.statusCode });
    else next(new DataDoesNotExistException());
  }
}

export default apiController;
