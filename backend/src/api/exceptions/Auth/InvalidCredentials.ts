import { UnauthorizedError } from 'routing-controllers';

import { CODE_INVALID_CREDENTIAL } from '../Config/error-code';

export class InvalidCredentials extends UnauthorizedError {
  constructor() {
    super(`${CODE_INVALID_CREDENTIAL}=Invalid credentials!`);
  }
}
