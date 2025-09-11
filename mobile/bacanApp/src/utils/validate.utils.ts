import { AuthResponseDTO } from 'src/models';

import { decodeJwt } from './jwt.utils';

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const messagePasswordFormat = 'Deve essere di almeno 8 caratteri e deve contenere una maiuscola e un carattere speciale';
export const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(regexEmail);
};

export const validatePassword = (password: string) => {
    const match = String(password).toLowerCase().match(regexPassword);

    return match;
};

export const validatePhone = (phone: string) => {
    if (phone.toString().length !== 10) {
        return false;
    } else {
        return true;
    }
};

export const validateEmptyFields = (fields: (string | undefined | null)[]) => {
    for (const field of fields) {
        if (field === undefined || field === null || field === '') {
            return false;
        }
    }
    return true;
};

export function isExpired(authData: AuthResponseDTO) {
    const payload = decodeJwt(authData.access_token);
    if (payload) {
        const expDate = new Date(payload.exp * 1000);
        return expDate.getTime() < new Date().getTime();
    }
    return true;
}
