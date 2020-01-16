import express from 'express';
import { Request, Response } from 'express';
import Controller from '../interfaces/controller';

class indexController implements Controller {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.render);
  }

  private render(req: Request, res: Response) {
    res.render('index.html');
  }
}

export default indexController;
