/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Alert,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useOrdersApi } from 'src/api';
import Footer from 'src/components/Footer/Footer';
import { initialTopology } from 'src/config';
import {
  useActionOrder,
  useCommonData,
} from 'src/context';
import { useCurrentOrder } from 'src/context/baca-order-context';
import { BacaScreenProps } from 'src/core';
import { IMAGElogo } from 'src/images';
import { TopologyView } from 'src/models';
import {
  mapDescriptionStatus,
  mapStatus,
  mapTitle,
  timeConverter,
} from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

type OrderStatusScreenProp = {} & BacaScreenProps & any;
const OrderStatusScreen = ({ navigation }: OrderStatusScreenProp) => {

    const [refreshing, setRefreshing] = useState(false);
    const { data, fetchCurrentCart } = useCurrentOrder();
    const { fetchData } = useActionOrder();
    const { doAsyncSendConfirmOrder } = useOrdersApi();
    const { todayPlaces } = useCommonData();

    const topology = useMemo<TopologyView>(() => {

        if (!data.cartOrderSaved) {
            return { ...initialTopology };
        }
        const currentPlace = todayPlaces.find(tp => tp.truckCode === data.cartOrderSaved?.truckCode);

        const status = mapStatus(data.cartOrderSaved?.stateOrderCode);
        const topologyView: TopologyView = {
            status,
            statusCode: data.cartOrderSaved?.stateOrderCode,
            title: mapTitle(status),
            description: mapDescriptionStatus(status),
            place: data.cartOrderSaved?.siteName,
            address: currentPlace ? `${currentPlace?.siteName}${(currentPlace?.siteAddress ? ', ' + currentPlace.siteAddress : '')}` : '',
            oldHour: timeConverter(data.cartOrderSaved.pickUpTimeRequest),
            newHouer: timeConverter(data.cartOrderSaved.pickUpTimeAccepted),
            truckPhone: data.cartOrderSaved.truckPhone,
        };

        if (data.lastRejectOrder) {
            const statusLastReject = mapStatus(data.lastRejectOrder.stateOrderCode);
            topologyView.title = mapTitle(statusLastReject);
            topologyView.description = mapDescriptionStatus(statusLastReject);
        }
        return topologyView;
    }, [data, todayPlaces]);

    const goHome = () => {
        navigation.navigate('Home');
    };

    const callTruck = useCallback(() => {
        if (topology.truckPhone) {
            Linking.openURL(`tel:${topology.truckPhone}`);
        } else {
            console.warn('Errore numero di telefono non trovato');
        }
    }, [topology]);

    const accepted = () => {
        sendResponse(true);
    };

    const denied = () => {
        sendResponse(false);
    };

    const sendResponse = (_accepted: boolean) => {
        const currentCart = data.cartOrderSaved ? { ...data.cartOrderSaved } : null;
        if (!currentCart) {
            return;
        }
        currentCart.response = _accepted ? 'CONFRIM' : 'DENIED';
        doAsyncSendConfirmOrder(currentCart)
            .then(async () => {
                Alert.alert('Ordine inviato');
                fetchCurrentCart();
                fetchData();
                setRefreshing(true);
                //navigation.navigate('Menu');
            })
            .catch((er) => {

                console.error(er);
                fetchCurrentCart();
                Alert.alert('ERRORE: Ordine non inviato');
            });
    };
    useEffect(() => {
        setRefreshing(false);
    }, [data]);

    const onRefresh = useCallback(() => {
        fetchCurrentCart();
        fetchData();
        setRefreshing(true);
    }, []);

    return (
        <ScrollView style={[tw`h-full`, GeneralStyle.container]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={[tw`p-5`]}>

                <Image
                    style={tw`m-auto mt-2 mb-3 rounded-full p-5`}
                    source={IMAGElogo} />

                <View style={[tw`mb-12`]}>
                    <Text style={[tw`text-center text-6xl m-auto mt-2`, GeneralStyle.title]}>
                        {topology.title}
                    </Text>
                    <Text style={[tw`text-center text-4xl m-auto my-2`, GeneralStyle.text]}>
                        {topology.description}
                    </Text>
                    {topology.status === 'attesa' ?
                        <View>
                            <Text style={[tw`text-center text-4xl my-2`, GeneralStyle.textOrange]}>
                                {topology.address}
                            </Text>
                            <Text style={[tw`text-center text-3xl my-2`, GeneralStyle.text]}>
                                Rimani in attesa che ti daremo risposta il prima possibile
                            </Text>
                        </View>
                        : <></>}
                    {topology.status === 'accettato' &&
                        <View style={[tw``]}>
                            <Text style={[tw`text-center text-3xl my-2`, GeneralStyle.text]}>
                                Ti aspettiamo a
                            </Text>
                            <Text style={[tw`text-center text-4xl my-2`, GeneralStyle.textOrange]}>
                                {topology.address}
                            </Text>
                            {topology.address &&
                                <><Text style={[tw`text-center text-3xl my-2`, GeneralStyle.text]}>
                                    alle
                                </Text>
                                    <Text style={[tw`text-center text-5xl my-2`, GeneralStyle.textOrange]}>
                                        {topology.newHouer}
                                    </Text>
                                </>}
                        </View>
                    }
                    {topology.status === 'trattativa' &&
                        <><Text style={[tw`text-center text-4xl my-2`, GeneralStyle.textOrange]}>
                            {topology.address}
                        </Text>
                            <View style={[tw``]}>
                                <View style={[tw``]}>
                                    <View style={[tw`my-1 flex`]}>
                                    <Text style={[tw`text-center text-2xl m-auto `, GeneralStyle.text]}>
                                        Ti proponiamo questo nuovo orario:
                                    </Text>
                                    <Text style={[tw`text-center text-4xl m-auto my-2`, GeneralStyle.textOrange]}>
                                        {topology.newHouer}
                                    </Text>
                                    </View>
                                    <View style={[tw``]}>
                                        <Pressable onPress={() => accepted()}>
                                            <View
                                                style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                                            >
                                                <Text style={[tw`text-center mt-1 text-2xl`, GeneralStyle.title]}>Si</Text>
                                            </View>
                                        </Pressable>

                                        <Pressable onPress={() => denied()}>
                                            <View
                                                style={[tw`mt-5`, GeneralStyle.submitOrange]}
                                            >
                                                <Text style={[tw`text-center mt-1 text-2xl`, GeneralStyle.yellow]}>No</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </>
                    }

                    <Pressable onPress={() => callTruck()}>
                        <View
                            style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                        >
                            <Text style={[tw`text-center mt-1 text-3xl`, GeneralStyle.title]}>Chiama il truck</Text>
                        </View>
                    </Pressable>

                    {topology.status !== 'trattativa' &&
                        <Pressable onPress={() => goHome()}>
                            <View
                                style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                            >
                                <Text style={[tw`text-center mt-1 text-3xl`, GeneralStyle.title]}>Vai alla Home</Text>
                            </View>
                        </Pressable>}

                </View>
            </View>
            <Footer />
        </ScrollView>
    );
};

export { OrderStatusScreen };
