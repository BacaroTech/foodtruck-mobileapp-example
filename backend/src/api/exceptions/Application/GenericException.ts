import { HttpError } from 'routing-controllers';

export class GenericException extends HttpError  {
  constructor(msg: string = "Errore generico") {
    
    super(500, msg);
  }
}
