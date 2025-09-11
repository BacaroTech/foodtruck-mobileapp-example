import { BadRequestError } from 'routing-controllers';

const defaultMsg = 'Registration Error!';
export class RegistrationError extends BadRequestError {
  constructor(msg: string = defaultMsg) {
    super(msg);
  }
}