import { useCallback } from 'react';

import axios from 'axios';
import { enableMock } from 'src/config/env';
import { useCurrentUser } from 'src/context';
import { currentOrderMock } from 'src/mock/orders.mock';
import {
  DishView,
  ExtrasAddedView,
  OrderDTO,
  OrderItemDTO,
} from 'src/models';
import {
  buildAxiosConfig,
  buildUrl,
} from 'src/utils/api.utils';
import {
  AppError,
  ERROR_CODE,
  ErrorCode,
} from 'src/utils/error-code';

const useOrdersApi = () => {

    const { data: authData } = useCurrentUser();

    /**
     * Get last cart order
     * @returns OrderDTO
     */
    const doLastOrders = useCallback(async () => {
        try {

            const response = await axios.get<OrderDTO>(
                buildUrl('/orders/lastCart'),
                buildAxiosConfig(authData.authData)
            );
            const data = response.data;
            if ((data as any) === '') {
                return null;
            }
            return data;

        } catch (error) {
            if ((error as any).status === 401) {
                console.error('401');
            } else {
                console.error('doLastOrders', error);
            }

            if (enableMock) {
                return { ...currentOrderMock } as OrderDTO;
            }
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);

        }
    },[authData]);


       /**
     * Get last cart order
     * @returns OrderDTO
     */
       const doLastRejectOrder = useCallback(async () => {
        try {
            //console.log("authData.authData", authData.authData)
            const response = await axios.get<OrderDTO>(
                buildUrl('/orders/lastReject'),
                buildAxiosConfig(authData.authData)
            );
            const data = response.data;
            if ((data as any) === '') {
                return null;
            }
            return data;

        } catch (error) {
            // console.error('doAsyncCurrentOrders', error, authData.authData);
            if ((error as any).status === 401) {
                console.error('401');
            } else {
                console.error('lastReject', error);
            }

            if (enableMock) {
                return { ...currentOrderMock } as OrderDTO;
            }
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);

        }
    },[authData]);
    /**
     * create or update cart order
     * @param cartOrder OrderDTO | null
     */
    const doAsyncCreateOrUpdateCart = async (cartOrder: OrderDTO | null) => {
        try {

            const body =  { ...cartOrder };
            if (cartOrder?.id) {
                await axios.put<OrderDTO[]>(
                    buildUrl(`/orders/cart/${cartOrder.id}`),
                    body,
                    buildAxiosConfig(authData.authData),
                );
            } else {
                await axios.post<OrderDTO[]>(
                    buildUrl('/orders/cart/'),
                    body,
                    buildAxiosConfig(authData.authData),
                );
            }

        } catch (error) {
            console.error('doAsyncCreateOrUpdateCart', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };

    /**
     * add dish to order and create or update cart order
     * @param cartOrder  OrderDTO
     * @param dish any
     * @param adds ExtrasView[]
     * @param note string
     * @param quantity number
     * @returns
     */
    const doAsyncAddDishCart = async (
        cartOrder: OrderDTO,
        dish: any,
        adds: ExtrasAddedView[],
        note: string,
        quantity: number
        ) => {
        try {
            const dView = dish as DishView;
            const _adds = adds.filter(add => add.status);
            const orderItem: OrderItemDTO = {
                dish: dView,
                extra: _adds,
                note: note,
                quantity: quantity,
            };
            const body = {
                ...cartOrder,
                ordersItems: [
                    ...cartOrder.ordersItems,
                    orderItem,
                ],
            };

            return await doAsyncCreateOrUpdateCart(body);

        } catch (error) {
            console.error('doAsyncAddDishCart', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };

    const doAsyncUpdateCart = async (
        cartOrder: OrderDTO,
        ) => {
        try {
            const body = { ...cartOrder };
            return await doAsyncCreateOrUpdateCart(body);

        } catch (error) {
            console.error('doAsyncAddDishCart', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };
    const doAsyncSendOrder = async (
        cartOrder: OrderDTO,
        ) => {
        try {

            const body = {
                ...cartOrder,
            };
            if (!cartOrder.id) {
                throw new AppError(new ErrorCode(ERROR_CODE.ID_EMPTY, 'invio ordine: id ordine non trovato'));
            }
            if (!cartOrder.truckCode) {
                throw new AppError(new ErrorCode(ERROR_CODE.TRUCK_CODE_EMPTY, 'invio ordine: truck code non trovato'));
            }
            if (!cartOrder.pickUpTimeRequest) {
                throw new AppError(new ErrorCode(ERROR_CODE.PICK_UP_TIME_REQUEST_EMPTY, 'invio ordine: ora di ritiro non trovato'));
            }
            await axios.post<OrderDTO[]>(
                buildUrl(`/orders/send/${cartOrder.id}`),
                body,
                buildAxiosConfig(authData.authData),
            );
        } catch (error) {
            console.error('doAsyncAddDishCart', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };
    const doAsyncSendConfirmOrder = async (
        cartOrder: OrderDTO,
        ) => {
        try {

            const body = {
                ...cartOrder,
            };
            if (!cartOrder.id) {
                throw new AppError(new ErrorCode(ERROR_CODE.ID_EMPTY, 'invio ordine: id ordine non trovato'));
            }
            if (!cartOrder.truckCode) {
                throw new AppError(new ErrorCode(ERROR_CODE.TRUCK_CODE_EMPTY, 'invio ordine: truck code non trovato'));
            }
            if (!cartOrder.pickUpTimeRequest) {
                throw new AppError(new ErrorCode(ERROR_CODE.PICK_UP_TIME_REQUEST_EMPTY, 'invio ordine: ora di ritiro non trovato'));
            }
            await axios.post<OrderDTO[]>(
                buildUrl(`/orders/send/${cartOrder.id}/trade`),
                body,
                buildAxiosConfig(authData.authData),
            );
        } catch (error) {
            console.error('doAsyncAddDishCart', error);
            throw new AppError(new ErrorCode(ERROR_CODE.GENERIC_ERROR, 'Error'), error);
        }
    };
    return {
        doLastOrders: doLastOrders,
        doAsyncCreateOrUpdateCart,
        doAsyncAddDishCart,
        doAsyncUpdateCart,
        doAsyncSendOrder,
        doAsyncSendConfirmOrder,
        doLastRejectOrder,
    };
};

export { useOrdersApi };
