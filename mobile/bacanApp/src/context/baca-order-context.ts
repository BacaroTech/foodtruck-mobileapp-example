import {
  createContext,
  useContext,
} from 'react';

import {
  OrderBaseDTO,
  OrderDTO,
  OrderItemView,
} from 'src/models';

export type IOrderContextData = {
    lastRejectOrder: OrderBaseDTO | null;
    cartOrderSaved: OrderDTO | null;
    orderItemsView: OrderItemView[],
    totalPrice: number,
    readonly: boolean,
}

export type IOrderContext = {
    loading: boolean,
    data: IOrderContextData,
    fetchCurrentCart: () => void,
    resetData: () => void,
};

export const initialOrderData: IOrderContextData = Object.freeze({
    lastRejectOrder: null,
    cartOrderSaved: null,
    orderItemsView: [],
    totalPrice: 0,
    readonly: false,
});

export const OrderContext = createContext<IOrderContext>({
    loading: false,
    data: initialOrderData,
    fetchCurrentCart: () => { },
    resetData:() => {},
});
export const useCurrentOrder = () => {
    const _context = useContext(OrderContext);

    if (!_context) {
        throw new Error(
            'OrderContext has to be used within <OrderContext.Provider>'
        );
    }

    return _context;
};
