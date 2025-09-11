import axios from 'axios';
import { AuthResponseDTO } from 'src/models';
import {
  AppError,
  ERROR_CODE,
  ErrorCode,
} from 'src/utils';
import { buildUrl } from 'src/utils/api.utils';

import { extractMessageError } from './error.api';

const useAuthApi = () => {

    const doAsyncRegistration = async (
        name: string,
        phone: string,
        email: string,
        password: string,
    ) => {
        try {
            const request = {
                email,
                password,
                telephone: phone,
                name: name,
            };
            const response = await axios.post<AuthResponseDTO>(
                buildUrl('/register'),
                request
            );
            return response.data;
        } catch (e: any) {
            const message = extractMessageError(e);
            throw new AppError(new ErrorCode(ERROR_CODE.HTTP_ERROR, message), message);
        }
    };

    const doAsyncLogin = async (email: string, password: string) => {
        try {
            const response = await axios
                .post<AuthResponseDTO>(
                    buildUrl('/login'), { email, password });
            return response.data;
        } catch (e) {
            const message = extractMessageError(e);
            throw new AppError(new ErrorCode(ERROR_CODE.HTTP_ERROR, message), e);
        }
    };

    return {
        doAsyncRegistration,
        doAsyncLogin,
    };
};

export { useAuthApi };
