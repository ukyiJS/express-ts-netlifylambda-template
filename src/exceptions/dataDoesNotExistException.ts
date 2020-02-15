import HttpException from './httpException';

export default class DataDoesNotExistException extends HttpException {
  constructor() {
    super(400, 'Data dose not exist');
  }
}
