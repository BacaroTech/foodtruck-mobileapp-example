/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
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
import { Spinner } from 'src/components';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { t } from 'src/location';
import {
  OrderTruckView,
  ProfileView,
} from 'src/models';
import {
  mapStatus,
  timeConverter,
} from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

import { useIsFocused } from '@react-navigation/native';

import { NightOrderStyle } from './NightOrderSyle';

type NightOrderScreenProps = {} & BacaScreenProps & any;
const NightOrderScreen = ({ }: NightOrderScreenProps) => {
  const navigation = useBacaNavigation();
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState<ProfileView>({
    email: '',
    phone: '',
    name: '',
  });
  const { doGetTruckOrders } = useTruckOrdersApi();
  const { getMe } = useUserApi();

  const [truckOrders, setTruckOrders] = useState<OrderTruckView[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const goToDetailOrder = (order: OrderTruckView) => {
    navigation.navigate('DetailSingleOrder', { orderID: order.orderID });
  };
  const onRefresh = useCallback(async () => {
    setLoading(true);

    const data = await doGetTruckOrders();
    setRefreshing(false);
    if (data) {

      setTruckOrders(data.map(d => ({
        orderID: d.id ?? 0,
        place: `${d?.siteName || ''}`,
        status: mapStatus(d.stateOrderCode),
        takeHour: timeConverter(d.pickUpTimeRequest),
        takePropose: timeConverter(d.pickUpTimeRequest),
        total: d.total ?? 0,
        user: d.userName ?? '',
        totalItems: d.totalItems,
      })));
    }
    setLoading(false);
  }, [doGetTruckOrders]);

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
      <Spinner show={loading}/>
      <Header subtitle={profile.name} />
      <View style={[tw`p-5`]}>
        <Text style={[tw`text-5xl my-3  text-center`, GeneralStyle.title]}>Ordini</Text>
        {truckOrders.length === 0 ? <Text style={[tw`text-center text-4xl mb-15`, GeneralStyle.text]}>Nessun ordine</Text> : <></>}
        {truckOrders.map(order => {
          return (
            <View style={[tw`w-full flex flex-col p-5 shadow-inner rounded-md shadow-md mb-5`, NightOrderStyle.order]} key={order.orderID}>
              <Text style={[tw`text-center text-4xl w-2/3`, GeneralStyle.text]}>Ordine di {order.user}</Text>
              <Text style={[tw`text-3xl mt-3`, GeneralStyle.title]}>Totale Pezzi: <Text style={[tw`text-3xl mt-3 `, GeneralStyle.text]}>{order.totalItems}</Text></Text>
              <Text style={[tw`text-3xl mt-3`, GeneralStyle.title]}>Orario recupero: <Text style={[tw`text-3xl mt-3 `, GeneralStyle.text]}>{order.takeHour}</Text></Text>
              <Text style={[tw`text-3xl mt-3`, GeneralStyle.title]}>Piazza: <Text style={[tw`text-3xl mt-3 `, GeneralStyle.text]}>{order.place}</Text></Text>
              <Text style={[tw`text-3xl mt-3`, GeneralStyle.title]}>Status: <Text style={[tw`text-3xl mt-3 `, GeneralStyle.text]}>
                {t(`truck.home.${order.status}`)}
              </Text></Text>

              <Pressable onPress={() => goToDetailOrder(order)}>
                <View
                  style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                >
                  <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Visualizza Ordine</Text>
                </View>
              </Pressable>
            </View>
          );
        })}

      </View>
      <Footer />
    </ScrollView>

  );
};

export { NightOrderScreen };
