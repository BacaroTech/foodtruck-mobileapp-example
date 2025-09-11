export abstract class ControllerBase {
  public nameClass: string = this.constructor["name"];
  public errorLog(error: any, nameFn?: string) {
    
    if (nameFn) {
      console.error(`${this.nameClass} - ${nameFn}`, error);
    } else {
      console.error(`${this.nameClass}`, error);
    }   
  }
}
