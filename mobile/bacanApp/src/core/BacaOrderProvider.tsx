/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useOrdersApi } from 'src/api';
import {
  initialOrderData,
  IOrderContext,
  IOrderContextData,
  OrderContext,
  useCurrentUser,
} from 'src/context';
import { useInterval } from 'src/hooks';
import {
  IChildrenReactNode,
  OrderBaseDTO,
  OrderDTO,
  OrderItemView,
} from 'src/models';
import { checkReadonlyState } from 'src/utils';
import { dishDtoViewMap } from 'src/utils/dish.utils';

type CurrentUserOrder = {
    currentOrder: OrderDTO;
    rejectOrder: OrderBaseDTO | null;
}
const BacaOrder = ({ children }: IChildrenReactNode) => {
    const { data } = useCurrentUser();

    const {
        doLastOrders,
        doLastRejectOrder,
    } = useOrdersApi();

    // const [cartOrderSaved, setCartOrderSaved] = useState<OrderDTO>({
    //     ordersItems: [],
    // });
    // const [rejectOrder, setRejectOrder] = useState<OrderBaseDTO | null>(null);
    const [currentUserOrder, setCurrentUserOrder] = useState<CurrentUserOrder>({
        currentOrder: { ordersItems: []},
        rejectOrder: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [orderData, setOrderData] = useState<IOrderContextData>(initialOrderData);

    const fetchCurrentCart = useCallback(async() => {
        setLoading(true);
        let cCart: OrderDTO | null = null;
        let rejectCart: OrderDTO | null = null;
        try {
            cCart = await doLastOrders();
        } catch (error) {
            console.error('Error get lastOrder', error);
        }
        try {
            rejectCart = await doLastRejectOrder();
        } catch (error) {
            console.error('Error get lastOrder', error);
        }
        setLoading(false);

        const cart = {
            currentOrder: cCart ? cCart : {ordersItems: []},
            rejectOrder: rejectCart,
        };
        setCurrentUserOrder(cart);

    }, [doLastOrders,doLastRejectOrder]);

    const resetData = useCallback(() => {
        setOrderData(initialOrderData);
    }, []);

    useEffect(() => {
        const { currentOrder: cartOrderSaved } = currentUserOrder;
        if (cartOrderSaved) {
            let orderItemsView: OrderItemView[] = [];
            let sum = 0;
            if (cartOrderSaved.ordersItems && cartOrderSaved.ordersItems.length > 0) {
                orderItemsView = cartOrderSaved.ordersItems.map(oitem => {
                    const _orderItemView: OrderItemView = {
                        id: oitem.id,
                        dish: dishDtoViewMap(oitem.dish),
                        quantity: oitem.quantity,
                        extra: [...(oitem.extra || [])],
                        note: (!oitem.note || oitem.note === '') ? 'nessuna' : oitem.note,
                    };
                    return _orderItemView;
                });
                cartOrderSaved.ordersItems.forEach(product => {

                    const totalPriceAdds = (product.extra || []).reduce((a, b) => a + Number(b.price), 0);
                    const parziale = Number(product.dish.price || 0) + Number(totalPriceAdds);
                    const totalParziale = parziale * product.quantity;

                    sum = totalParziale + sum;
                });
            }

            const readonly = checkReadonlyState(cartOrderSaved.stateOrderCode);

            setOrderData((cData) => ({
                ...cData,
                lastRejectOrder: currentUserOrder.rejectOrder ? {...currentUserOrder.rejectOrder} : null,
                cartOrderSaved,
                orderItemsView,
                totalPrice: sum,
                readonly: readonly,
            }));
        }

    }, [currentUserOrder]);

    useEffect(() => {
        if (data.authData?.access_token) {
            fetchCurrentCart();
        }
    }, [data]);

    useInterval(() => {
        console.log("tick")
        if (data.authData?.access_token) {
            console.log("fetch current cart");
            fetchCurrentCart();
        }
    }, 60000);

    const contextValue = useMemo<IOrderContext>(() => {

        return {
            loading,
            data: { ...orderData },
            fetchCurrentCart,
            resetData,
        };
    }, [orderData, loading]);


    return <OrderContext.Provider value={contextValue}>
        {children}
    </OrderContext.Provider>;
};
export { BacaOrder };
