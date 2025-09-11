/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  useTruckOrdersApi,
  useUserApi,
} from 'src/api';
import {
  Footer,
  Header,
  Spinner,
} from 'src/components';
import {
  orderDefault,
  TruckUI,
} from 'src/config';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import {
  AddsTruckView,
  OrderItemDTO,
  OrderTruckItemsView,
  OrderTruckViewDetail,
  ProfileView,
  BacaResponseType,
  TruckOrderDTO,
} from 'src/models';
import GeneralStyle, {
  countTotalItemsOrder,
  mapStatus,
  timeConverter,
} from 'src/utils';
import tw from 'twrnc';

import { useIsFocused } from '@react-navigation/native';

import DetailSingleOrderStyle from './DetailSingleOrderStyle';

const mapOrderItemView = (orderItem: OrderItemDTO): OrderTruckItemsView => {

    const adds: AddsTruckView[] = (orderItem.extra || []).map(e => ({
        name: e.name,
        price: `${e.price}`,
    }));
    const ordItemView: OrderTruckItemsView = {
        basePrice: `${orderItem.dish.price}`,
        name: orderItem.dish.name,
        description: orderItem.dish.description || '',
        quantity: orderItem.quantity,
        remove: orderItem.note || '',
        adds: adds,
    };
    return ordItemView;
};
type DetailSingleOrderScreenProps = {} & BacaScreenProps & any;
const DetailSingleOrderScreen = ({ route }: DetailSingleOrderScreenProps) => {
    const navigation = useBacaNavigation();
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState<ProfileView>({
        email: '',
        phone: '',
        name: '',
    });
    const { orderID } = route.params;

    const { getMe } = useUserApi();

    const { doGetTruckOrderById, doUpdateTruckOrder } = useTruckOrdersApi();
    const [refreshing, setRefreshing] = useState(false);
    const [truckOrder, setTruckOrder] = useState<TruckOrderDTO | null>(null);
    const [truckOrderView, setTruckOrderView] = useState<OrderTruckViewDetail>({
        ...orderDefault,
        orderID,
    });

    const onRefresh = useCallback(() => {
        fetchData();
    }, []);
    const fetchData = useCallback(async () => {
        setLoading(true);
        const d = await doGetTruckOrderById(orderID);

        setRefreshing(false);
        if (d) {
            setTruckOrder(d);
            const _data: OrderTruckViewDetail = {
                orderID,
                place: d.siteName ?? '',
                status: mapStatus(d.stateOrderCode),
                takeHour: timeConverter(d.pickUpTimeRequest),
                takePropose: timeConverter(d.pickUpTimeAccepted),
                total: d.total ?? 0,
                user: d.userName ?? '',
                orderItems: d.ordersItems.map(mapOrderItemView),
                totalItems: countTotalItemsOrder(d.ordersItems),
            };

            setTruckOrderView(_data);
        }
        setLoading(false);
    }, []);

    const goToNightOrders = (accepted: BacaResponseType) => {
        if (truckOrder) {
            setLoading(true);
            doUpdateTruckOrder(
                orderID,
                truckOrder,
                accepted,
            ).then(() => {
                setLoading(false);
                navigation.navigate('NightOrders');
            }).catch((error) => {
                setLoading(false);
                console.error(error);
                onRefresh();
                Alert.alert('ERRORE: Ordine non inviato');
            });
        }
    };

    const goToPospore = (_orderID: number, user: string, hour: string) => {
        navigation.navigate('Postpore',
            {
                orderID: _orderID,
                user: user,
                oldHour: hour,
            });
    };
    const fetchDataMe = useCallback(async () => {
        setLoading(true);
        const me = await getMe();
        setLoading(false);
        setRefreshing(false);
        if (me) {
            setProfile(me);
        }
    }, []);
    useEffect(() => {
        onRefresh();
        fetchDataMe();
    }, [isFocused]);

    return (
        <ScrollView style={[tw`h-full`, GeneralStyle.container]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Header subtitle={profile.name} />
            <Spinner show={loading} />
            <View style={[tw`p-5`]}>
                <Text style={[tw`text-5xl  text-center my-3`, GeneralStyle.text]}>
                    Ordine di {truckOrderView?.user || ''}
                </Text>

                {truckOrderView?.orderItems.map(order => {
                    return (
                        <ScrollView key={order.name + order.remove}
                            style={[tw`mb-10`]}
                        >
                            <View style={[tw`mt-10 flex flex-row justify-between w-full`]}>
                                <Text style={[tw`text-4xl w-3/4`, GeneralStyle.title]}>
                                    {order.name}
                                </Text>
                                <View style={[tw`flex flex-row w-1/4 items-center`]}>
                                    <Text style={[tw`text-xl`, GeneralStyle.text]}> x </Text>
                                    <Text style={[tw`text-3xl`, GeneralStyle.text]}>{order.quantity}</Text>
                                </View>

                            </View>

                            {TruckUI.showDescription ? <Text style={[tw`text-2xl w-full`, GeneralStyle.text]}>
                                {order.description}
                            </Text> : <></>}

                            <Text style={[tw`text-3xl mt-2`, GeneralStyle.title]}>
                                Aggiunte
                            </Text>
                            {order.adds.map(add => {
                                return (
                                    <View style={DetailSingleOrderStyle.checkboxContainer} key={add.name}>
                                        <Text style={[tw`text-2xl mr-4`, GeneralStyle.text]}>{add.name}</Text>
                                        <Text style={[tw`text-2xl`, GeneralStyle.text]}>{add.price}€</Text>
                                    </View>
                                );
                            })}
                            <Text style={[tw`text-3xl  mt-2`, GeneralStyle.title]}>
                                Rimozioni
                            </Text>
                            <Text style={[tw`text-2xl `, GeneralStyle.text]}>
                                {order.remove}
                            </Text>
                            <Text style={[tw`text-3xl  w-72 mt-5`, GeneralStyle.text]}>
                                Totale Costo: {order.basePrice}€
                            </Text>
                        </ScrollView>
                    );
                })}


                <View style={[tw`mt-20`]}>
                    <Text style={[tw`text-4xl w-72 w-full`, GeneralStyle.title]}>Totale</Text>
                    <Text style={[tw`text-4xl w-72 absolute bottom-0 right-0 text-right pr-5`, GeneralStyle.text]}>{truckOrderView.total}€</Text>
                </View>

                {truckOrderView.status === 'trattativa' ?
                    <View
                        style={[tw`mt-5`]}
                    >
                        <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Nuovo Orario proposto:</Text>
                        <Text style={[tw`text-center mt-1 text-2xl`, GeneralStyle.title, GeneralStyle.text]}>{truckOrderView.takePropose}</Text>
                        <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>In Attesa di conferma...</Text>
                    </View>
                    : <></>}

                {truckOrderView.status === 'accettato' ? <Pressable onPress={() => goToNightOrders('PICKEDUP')}>
                    <View
                        style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                    >
                        <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Ritirato</Text>
                    </View>
                </Pressable> : <></>}
                {truckOrderView.status === 'attesa' ? <><Pressable onPress={() => goToNightOrders('CONFRIM')}>
                    <View
                        style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                    >
                        <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Accetta</Text>
                    </View>
                </Pressable>

                    <Pressable onPress={() => goToPospore(orderID, truckOrderView.user || '', truckOrderView.takeHour)}>
                        <View
                            style={[tw`mt-5`, GeneralStyle.submitTrasparent]}
                        >
                            <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Posticipa</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => goToNightOrders('DENIED')}>
                        <View
                            style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitOrange]}
                        >
                            <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.yellow]}>Rifiuta</Text>
                        </View>
                    </Pressable></> : <></>}

            </View>
            <Footer />
        </ScrollView>
    );
};

export { DetailSingleOrderScreen };
