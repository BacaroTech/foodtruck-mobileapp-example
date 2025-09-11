export enum ERROR_CODE {
    ID_EMPTY = 'ID_EMPTY',
    TRUCK_CODE_EMPTY = 'TRUCK_CODE_EMPTY',
    PICK_UP_TIME_REQUEST_EMPTY = 'PICK_UP_TIME_REQUEST_EMPTY',
    HTTP_ERROR = 'HTTP_ERROR',
    HTTP_UNAUTHORIZE_ERROR = 'HTTP_UNAUTHORIZE_ERROR',
    GENERIC_ERROR = 'GENERIC_ERROR'
}

export function mapLocateError(code: ERROR_CODE): string {

    switch (code) {
        case ERROR_CODE.ID_EMPTY:
            return 'Errore con interno';
        case ERROR_CODE.TRUCK_CODE_EMPTY:
            return 'Seleziona il truck o la piazza';
        case ERROR_CODE.PICK_UP_TIME_REQUEST_EMPTY:
            return 'Seleziona l\'orario di ritiro';
        case ERROR_CODE.HTTP_ERROR:
            return 'Errore con il server';
        case ERROR_CODE.GENERIC_ERROR:
            return 'Errore Generico';
        default:
            return 'Errore Generico';
    }
}
export class ErrorCode {

    constructor(
        public code: ERROR_CODE,
        public msg: string) { }
}

export class AppError extends Error {

    constructor(public errorCode: ErrorCode, error?: any) {
        super(error);
    }
}
