import { Request } from 'express';
import HttpException from './httpException';

export default class NotFoundException extends HttpException {
  constructor(req: Request) {
    super(404, `${req.originalUrl} 404 Not Found`);
  }
}
