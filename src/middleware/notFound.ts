import { Request, Response } from 'express';

function notFoundMiddleware(req: Request, res: Response) {
  const url = req.originalUrl;
  const status = 404;
  const message = '404 Not Found';
  res.status(status).send({ url, message, status });
}

export default notFoundMiddleware;
