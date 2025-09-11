import React from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { IRouteNameList } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { OrderDTO } from 'src/models';
import {
  GeneralStyle,
  YELLOW,
} from 'src/utils';
import tw from 'twrnc';

type StatusOrderView = {
    title: string;
    subtitle: string;
    destination?: IRouteNameList;
    show: boolean;
}
function mapOrderStatus(currentOrder: OrderDTO | null): StatusOrderView {
    if (!currentOrder) {
        return {
            title: '',
            subtitle: '',
            show: false,
        };
    }
    if (currentOrder.stateOrderCode === 'CART') {
        return {
            title: 'Hai un ordine in sospeso.',
            subtitle: 'Riprendi da qui!',
            destination: 'CheckOut',
            show: true,
        };
    } else if (currentOrder.stateOrderCode === 'SEND') {
        return {
            title: 'Hai un ordine inviato.',
            subtitle: 'Controlla lo stato',
            destination: 'OrderStatus',
            show: true,
        };
    } else if (currentOrder.stateOrderCode === 'ACCEPTED') {
        return {
            title: 'Hai un ordine accettato. Vieni a ritirarlo.',
            subtitle: 'Controlla le informazioni',
            destination: 'OrderStatus',
            show: true,
        };
    } else if (currentOrder.stateOrderCode === 'TRADE') {
        return {
            title: 'Il tuo ordine ha subito un cambio orario.',
            subtitle: 'Controlla le informazioni e conferma',
            destination: 'OrderStatus',
            show: true,
        };
    } else if (currentOrder.stateOrderCode === 'REJECT') {
        return {
            title: 'Il tuo ultimo ordine è stato cancellato.',
            subtitle: '',
            destination: 'OrderStatus',
            show: true,
        };
    }

    return {
        title: '',
        subtitle: '',
        show: false,
    };
}
type CurrentOrderStatusProps = {
    currentOrder: OrderDTO | null
}
function CurrentOrderStatus({ currentOrder }: CurrentOrderStatusProps) {
    const infoView = mapOrderStatus(currentOrder);
    const navigation = useBacaNavigation();
    const goCheckOut = () => {
        if (infoView.destination){
            navigation.navigate(infoView.destination);
        }
    };
    return (<>
        {infoView.show && <Pressable onPress={() => goCheckOut()}>
            <View style={[tw`px-5 mt-5 mx-5`, { backgroundColor: YELLOW, borderRadius: 15 }]}>
                <Text style={[tw`text-center text-2xl mt-2`, GeneralStyle.titleStatus]}>
                    {infoView.title}
                </Text>
                <Text style={[tw`text-center text-2xl mb-2`, GeneralStyle.titleStatus]}>
                    {infoView.subtitle}
                </Text>
            </View>
        </Pressable>
        }</>);
}

export { CurrentOrderStatus };
