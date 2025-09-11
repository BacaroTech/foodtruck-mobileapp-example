import { useCallback } from 'react';

import axios from 'axios';
import { useCurrentUser } from 'src/context';
import {
  BacaResponseType,
  TruckOrderDTO,
} from 'src/models';
import {
  AppError,
  buildAxiosConfig,
  buildUrl,
  ERROR_CODE,
  ErrorCode,
} from 'src/utils';

const useTruckOrdersApi = () => {
    const { data: authData } = useCurrentUser();
    const doGetTruckOrders = useCallback(async () => {
        try {
            const response = await axios.get<TruckOrderDTO[]>(
                buildUrl('/truck/orders'),
                buildAxiosConfig(authData.authData)
            );

            const data = response.data;
            return data;

        } catch (error) {
            console.error('doGetTruckOrders', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    }, [authData]);

    const doGetTruckOrderById = useCallback(async (orderID: number) => {
        try {
            const response = await axios.get<TruckOrderDTO>(
                buildUrl(`/truck/orders/${orderID}`),
                buildAxiosConfig(authData.authData)
            );
            return response.data;
        } catch (error) {
            console.error('doGetTruckOrderById', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    }, [authData]);
    const doUpdateTruckOrder = async (
        orderID: number,
        cartOrder: TruckOrderDTO,
        status: BacaResponseType,
        dateAccepted?: Date
    ) => {
        try {
            const dataRequest: TruckOrderDTO = {
                ...cartOrder,
                response: status,
            };
            if (dateAccepted) {
                dataRequest.pickUpTimeAccepted = dateAccepted.toLocaleTimeString();
            }

            const body = { ...dataRequest };

            await axios.post<TruckOrderDTO[]>(
                buildUrl(`/truck/orders/${orderID}`),
                body,
                buildAxiosConfig(authData.authData),
            );


        } catch (error) {
            console.error('doAsyncCreateOrUpdateCart', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };
    return {
        doGetTruckOrders,
        doGetTruckOrderById,
        doUpdateTruckOrder,
    };
};

export { useTruckOrdersApi };
