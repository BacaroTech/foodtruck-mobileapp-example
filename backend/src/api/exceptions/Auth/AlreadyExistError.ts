import { HttpError } from 'routing-controllers';

import { CODE_ALREADY_EXIST } from '../Config/error-code';

const defaultMsg = 'Registration Error!';
export class AlreadyExistError extends HttpError {
  constructor(msg: string = defaultMsg) {
    super(409, `${CODE_ALREADY_EXIST}=${msg}`);
  }
}