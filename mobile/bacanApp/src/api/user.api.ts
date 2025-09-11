import { useCallback } from 'react';

import axios from 'axios';
import { useCurrentUser } from 'src/context';
import {
  TruckDTO,
  UserDTO,
} from 'src/models';
import {
  AppError,
  buildAxiosConfig,
  buildUrl,
  ERROR_CODE,
  ErrorCode,
} from 'src/utils';

const useUserApi = () => {

    const { data: authData } = useCurrentUser();
    const getMe = useCallback(async () => {
        try {
            const response = await axios.get<UserDTO>(
                buildUrl('/user/me'),
                buildAxiosConfig(authData.authData)
            );

            const data = response.data;
            return data;

        } catch (error) {
            console.error('getMe', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    }, [authData]);

    const getTruckMe = useCallback(async () => {
        try {
            const response = await axios.get<TruckDTO>(
                buildUrl('/user/truck/me'),
                buildAxiosConfig(authData.authData)
            );

            const data = response.data;
            return data;

        } catch (error) {
            console.error('getMe', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    }, [authData]);

    const doChangePassword = async (newPassword: string) => {
        try {
            const response = await axios.post<UserDTO>(
                buildUrl('/user/changepassword'),
                {
                    newPassword,
                },
                buildAxiosConfig(authData.authData)
            );

            const data = response.data;
            return data;

        } catch (error) {
            console.error('doChangePassword', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };

    return {
        getMe,
        doChangePassword,
        getTruckMe,
    };
};

export { useUserApi };
