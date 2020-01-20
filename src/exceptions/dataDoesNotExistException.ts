import HttpException from './httpException';

class DataDoesNotExistException extends HttpException {
  constructor() {
    super(400, 'data dose not exist');
  }
}

export default DataDoesNotExistException;
