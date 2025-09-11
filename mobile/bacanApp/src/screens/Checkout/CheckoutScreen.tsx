/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
} from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { BaseScreen } from 'src/components';
import { useCurrentOrder } from 'src/context/baca-order-context';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { OrderItemView } from 'src/models';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

import { CheckoutContent } from './CheckoutContent';

type CheckoutScreenProp = {} & BacaScreenProps;
const InternalCheckoutScreen = ({ }: CheckoutScreenProp) => {
    const navigation = useBacaNavigation();    const { data } = useCurrentOrder();
    const { cartOrderSaved, orderItemsView } = data;

    const [totalItemCart, setTotalItemCart] = useState<number>(0);

    const _checkValueCart = (_currentOrderItems: OrderItemView[]) => {
        if (!_currentOrderItems || _currentOrderItems.length === 0) {
            return 0;
        }
        let count = 0;
        _currentOrderItems.forEach((orderItem) => {
            if (orderItem.quantity !== 0) {
                count++;
            }
        });
        return count;
    };

    const goHome = () => {
        navigation.navigate('Home');
    };

    useEffect(() => {
        setTotalItemCart(_checkValueCart(orderItemsView));
    }, [cartOrderSaved]);

    return (
        <View style={[tw`p-5 flex flex-col w-full`]}>
            {totalItemCart > 0 && <CheckoutContent />}
            {totalItemCart === 0 &&
                <View style={[tw`mt-15 mb-15`]}>
                    <Text style={[tw`text-3xl w-72 w-full text-center`, GeneralStyle.text]}>Il tuo carrello risulta vuoto!</Text>
                    <Pressable onPress={() => { goHome(); }}>
                        <View
                            style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}>
                            <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Vai alla home</Text>
                        </View>
                    </Pressable>
                </View>
            }
        </View>
    );
};

const CheckoutScreen = (prop: any) => {
    return <BaseScreen subtitle={'Carrello'}>
        <InternalCheckoutScreen {...prop} />
    </BaseScreen>;
};

export { CheckoutScreen };
