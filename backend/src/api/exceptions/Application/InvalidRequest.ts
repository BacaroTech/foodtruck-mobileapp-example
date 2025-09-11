import { HttpError } from 'routing-controllers';

export class InvalidRequestException extends HttpError  {
    constructor(msg: string = "Errore generico") {
      
      super(400, msg);
    }
  }
  