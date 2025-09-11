export class MexLogger {
    public static info(msg: string) {
        console.info(msg)
    }

    public static error(msg: string, error?: any) {
        console.error(msg, error);
    }

    public static warn(msg: string, error?: any) {
        console.warn(msg, error);
    }

    public static debug(msg: string | any, other?: any) {
        if ( process.env.NODE_ENV === 'development') {
            console.log("DEBUG",msg, other ?? {...other})
        }
    }
}