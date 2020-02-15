import log, { ERROR } from '../utils/log';

class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.message = message;

    log(ERROR)(message);
  }
}

export default HttpException;
