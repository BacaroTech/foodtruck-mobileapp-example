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
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useTruckOrdersApi,
  useUserApi,
} from 'src/api';
import {
  Footer,
  Header,
  Spinner,
} from 'src/components';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import {
  BacaResponseType,
  TruckOrderDTO,
  TruckProfileView,
} from 'src/models';
import {
  createMax,
  createMin,
  DateTimePickerMode,
} from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

import { useIsFocused } from '@react-navigation/native';

type PostporeScreenProps = {} & BacaScreenProps & any;
const PostporeScreen = ({ route }: PostporeScreenProps) => {
  const { orderID, user, oldHour } = route.params;
  const [date, setDate] = useState<Date>(new Date());
  const [minTime,setMinTime] = useState<Date>(createMin());
  const [maxTime,setMaxTime] = useState<Date>(createMax());
  const [dateSetup, setDateSetup] = useState<boolean>(false);

  const [mode, setMode] = useState<DateTimePickerMode>('time');
  const [show, setShow] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { getTruckMe } = useUserApi();

  const [profile, setProfile] = useState<TruckProfileView>({
    email: '',
    phone: '',
    name: '',
    truckDay: null,
  });
  const navigation = useBacaNavigation();
  const { doGetTruckOrderById, doUpdateTruckOrder } = useTruckOrdersApi();
  const [refreshing, setRefreshing] = useState(false);
  const [truckOrder, setTruckOrder] = useState<TruckOrderDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (selectedDate: any) => {

    let currentDate = selectedDate;
    setShow(false);
    let outTime = false;
    if (currentDate.getTime() < minTime.getTime()) {
        Alert.alert("Orario selezionato fuori dall'orario di servizio.");

        currentDate = minTime;
        outTime = true;
    }
    if (currentDate.getTime() > maxTime.getTime()) {
        Alert.alert("Orario selezionato fuori dall'orario di servizio.");

        currentDate = maxTime;
        outTime = true;
    }
    setShow(outTime);
    setDate(currentDate);
    setDateSetup(true);

  };

  const showMode = (currentMode: DateTimePickerMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const goToNightOrders = (accepted: BacaResponseType) => {
    if (truckOrder) {
      setLoading(true);
      doUpdateTruckOrder(
        orderID,
        truckOrder,
        accepted,
        date
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
  const fetchData = useCallback(async () => {
    setLoading(true);
    const d = await doGetTruckOrderById(orderID);
    const me = await getTruckMe();
    setLoading(false);
    setRefreshing(false);
    if (d) {
      setTruckOrder(d);
    }
    if (me) {
      if (me.truckDay) {
        const max = createMax(me.truckDay);
        const min = createMin(me.truckDay);
        setMaxTime(max);
        setMinTime(min);
      }
      setProfile(me);
    }
  }, []);
  const onRefresh = useCallback(() => {
    fetchData();
  }, []);
  useEffect(() => {
    onRefresh();
  }, [isFocused]);

  return (
    <ScrollView style={[tw`h-full`, GeneralStyle.container]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header subtitle={profile.name} />
      <Spinner show={loading}/>
      <View style={[tw`p-5`]}>
        <Text style={[tw`text-center text-5xl `, GeneralStyle.title]}>Posticipa</Text>
        <Text style={[tw`text-center text-4xl my-3 `, GeneralStyle.text]}>Ordine di {user}</Text>

        <Text style={[tw`text-center text-4xl my-3 `, GeneralStyle.title]}>Orario di recupero proposto:
          <Text style={[tw`text-center text-4xl mt-3 `, GeneralStyle.text]}> {oldHour}</Text>
        </Text>

        <SafeAreaView>
          <Text style={[tw`text-center text-4xl mt-3 `, GeneralStyle.title]}>
            Proponi un nuovo orario
          </Text>
          {dateSetup &&
            <View
              style={[tw`my-5`]}>
              <Text style={[tw`text-center mt-1 text-3xl`, GeneralStyle.text]}>Hai selezionato {date.getHours() + ':' + date.getMinutes()}</Text>
            </View>}
          <Pressable onPress={showTimepicker}>
            <View
              style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}>
              <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Inserisci l'orario</Text>
            </View>
          </Pressable>
          <DatePicker
             modal
             open={show}
                date={date}
                mode={mode}
                onConfirm={onChange}
                onCancel={() => {
                    setShow(false);
                }}
                minuteInterval={5}

            />
        </SafeAreaView>
        <Pressable onPress={() => { goToNightOrders('RUNNING'); }}>
          <View
            style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
          >
            <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Invia</Text>
          </View>
        </Pressable>
      </View>
      <Footer />
    </ScrollView>
  );
};

export { PostporeScreen };
