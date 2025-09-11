/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useOrdersApi } from 'src/api';
import {
  Spinner,
  BacaModal,
} from 'src/components';
import { useBaseScreen } from 'src/components/BaseScreen/base-screen-context';
import { useCommonData } from 'src/context';
import { useCurrentOrder } from 'src/context/baca-order-context';
import {
  OrderDTO,
  OrderItemView,
} from 'src/models';
import { TruckDayDTO } from 'src/models/where.interfaces';
import {
  AppError,
  createMax,
  createMin,
  DateTimePickerMode,
  dateToMinutes,
  FontFamilyName,
  GeneralStyle,
  GREEN,
  mapLocateError,
  ORANGE,
  printTime,
  YELLOW,
} from 'src/utils';
import tw from 'twrnc';

import { useNavigation } from '@react-navigation/native';

import { CheckoutProductList } from './CheckoutProductList';

type SaveProp = {
    _cartOrderSaved: OrderDTO,
    _currentOrderItems?: OrderItemView[],
    _date?: Date,
    _place?: TruckDayDTO | null
}
export const CheckoutContent = () => {

    const navigation = useNavigation();
    const {
        data,
        loading: loadingOrder,
        fetchCurrentCart,
    } = useCurrentOrder();
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);
    const [alertInfo, setAlertInfo] = useState({ msg: '', modal: false });
    const { setError } = useBaseScreen();
    const {
        orderItemsView: currentOrderItems,
        totalPrice: total,
        readonly,
    } = data;

    const cartOrderSaved: OrderDTO = useMemo(() => {
        return data.cartOrderSaved || { ordersItems: [] };
    }, [data]);

    const { doAsyncUpdateCart, doAsyncSendOrder } = useOrdersApi();
    const { todayPlaces: places } = useCommonData();


    const [minTime, setMinTime] = useState<Date>(createMin());
    const [maxTime, setMaxTime] = useState<Date>(createMax());

    const [placeSelected, setPlaceSelected] = useState<TruckDayDTO | null>(null);
    const [date, setDate] = useState<Date>(minTime);
    const [dateSetup, setDateSetup] = useState<boolean>(false);
    const [dateOutRange, setDateOutRange] = useState<boolean>(false);

    const [mode, setMode] = useState<DateTimePickerMode>('time');
    const [show, setShow] = useState<boolean>(false);

    const addElement = (i: number) => {
        const newOrderItems = [...currentOrderItems];
        newOrderItems[i].quantity++;

        saveCart({
            _currentOrderItems: newOrderItems,
            _cartOrderSaved: cartOrderSaved,
        });
    };

    const reduceElement = (i: number) => {
        const newOrderItems = [...currentOrderItems];
        if (newOrderItems[i].quantity > 0) {
            newOrderItems[i].quantity--;
        }
        saveCart({
            _currentOrderItems: newOrderItems,
            _cartOrderSaved: cartOrderSaved,
        });
    };

    const onChangePlace = (place: TruckDayDTO) => {
        setPlaceSelected(place);
        saveCart({
            _cartOrderSaved: cartOrderSaved,
            _place: place,
        });
    };

    const onChange = (selectedDate: Date) => {

        let currentDate = selectedDate;
        setShow(false);

        setDate(currentDate);

        setDateSetup(true);
        saveCart({
            _cartOrderSaved: cartOrderSaved,
            _date: currentDate,
        });
    };

    const showMode = (currentMode: DateTimePickerMode) => {
        setMode(currentMode);
        setShow(true);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const saveCart = (saveProp: SaveProp) => {
        const {
            _currentOrderItems,
            _cartOrderSaved,
            _date,
            _place,
        } = saveProp;
        const currentCart: OrderDTO = { ..._cartOrderSaved };
        if (_currentOrderItems) {
            currentCart.ordersItems = [..._currentOrderItems];
        }
        if (_date) {
            currentCart.pickUpTimeRequest = _date.toLocaleTimeString();
        }

        if (_place) {
            currentCart.truckCode = _place.truckCode;
            currentCart.dayCode = _place.dayCode;
            currentCart.siteCode = _place.siteCode;
        }

        setLoadingCheckout(true);
        doAsyncUpdateCart(currentCart)
            .then(() => {
                setLoadingCheckout(false);
                fetchCurrentCart();
            })
            .catch((err) => {
                setLoadingCheckout(false);
                console.error(err);
                fetchCurrentCart();
                Alert.alert('ERRORE: Piatto NON aggiunto');
            });
    };
    const preSendOrder = () => {
        if (!placeSelected) {
            setAlertInfo({
                modal: true,
                msg: 'Seleziona una piazza',
            });
            setError({
                error: true,
                msg: 'Seleziona una piazza',
            });
            return;
        }
        if (!dateSetup) {
            setAlertInfo({
                modal: true,
                msg: 'Seleziona un orario',
            });

            setError({
                error: true,
                msg: 'Seleziona un orario',
            });
            return;
        }

        if (dateOutRange) {
            setAlertInfo({
                modal: true,
                msg: 'Seleziona un orario dentro la fascia oraria',
            });

            setError({
                error: true,
                msg: 'Seleziona un orario dentro la fascia oraria',
            });
            return;
        }
        setModalVisible(true);
    };


    const checkRangeTimeSelected = () => {
        if (!dateSetup) {
            return;
        }
        const minTimeMinutes = dateToMinutes(minTime);
        const maxTimeMinutes = dateToMinutes(maxTime);
        const dateSelectedMinutes = dateToMinutes(date);

        if (dateSelectedMinutes < minTimeMinutes) {
            setDateOutRange(true);
            return;
        }
        if (dateSelectedMinutes > maxTimeMinutes) {
            setDateOutRange(true);
            return;
        }

        setDateOutRange(false);
    };

    const sendOrder = () => {

        const currentCart: OrderDTO = { ...cartOrderSaved };
        currentCart.ordersItems = [...currentOrderItems];
        currentCart.truckCode = placeSelected?.truckCode;
        currentCart.pickUpTimeRequest = date.toLocaleTimeString();
        setLoadingCheckout(true);

        doAsyncSendOrder(currentCart)
            .then(() => {
                setLoadingCheckout(false);

                fetchCurrentCart();

                const route = 'OrderStatus' as never;
                navigation.navigate(route);
            })
            .catch((er) => {
                setLoadingCheckout(false);
                if (er instanceof AppError) {
                    setError({
                        error: true,
                        msg: mapLocateError(er.errorCode.code),
                    });
                }
                console.error(er);
                fetchCurrentCart();
            });
    };

    useEffect(() => {
        if (placeSelected) {
            setMinTime(createMin(placeSelected));
            setMaxTime(createMax(placeSelected));
            checkRangeTimeSelected();
        }
    }, [placeSelected]);

    useEffect(() => {
        if (date) {
            checkRangeTimeSelected();
        }
    }, [date]);

    useEffect(() => {
        checkRangeTimeSelected();
    }, [data]);

    useEffect(() => {
        setLoading(loadingCheckout || loadingOrder);
    }, [
        loadingCheckout,
        loadingOrder,
    ]);

    return <>
        <Spinner show={loading} />
        <BacaModal modalVisible={modalVisible}>
            <View style={[tw`flex flex-col items-center gap-2`]}>
                <Text style={[tw`text-2xl`, GeneralStyle.title]}>Confermi di inviare l'ordine alla piazza </Text>
                <Text style={[tw`text-3xl font-bold`, GeneralStyle.title]}> {placeSelected?.siteName}</Text>
            </View>
            <View style={[tw`flex flex-col gap-2`]}>
                <Pressable disabled={readonly} onPress={() => { sendOrder(); }}>
                    <View
                        style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitGreen]}>
                        <Text style={[tw`px-10 text-center mt-1 text-3xl`, GeneralStyle.titleYellow]}>Invia Ordine</Text>
                    </View>
                </Pressable>
                <Pressable disabled={readonly} onPress={() => { setModalVisible(false); }}>
                    <View
                        style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}>
                        <Text style={[tw`px-10 text-center mt-1 text-2xl`, GeneralStyle.title]}>Cancella</Text>
                    </View>
                </Pressable>
            </View>
        </BacaModal>
        <BacaModal modalVisible={alertInfo.modal}>
            <Text style={[tw`text-3xl`, GeneralStyle.title]}>{alertInfo.msg}</Text>
            <View style={[tw`flex flex-col gap-2`]}>

                <Pressable disabled={readonly} onPress={() => { setAlertInfo({ msg: '', modal: false }); }}>
                    <View
                        style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitGreen]}>
                        <Text style={[tw`px-10 text-center mt-1 text-xl`, GeneralStyle.titleYellow]}>Chiudi</Text>
                    </View>
                </Pressable>
            </View>
        </BacaModal>
        <CheckoutProductList
            disabled={readonly}
            addElement={addElement}
            reduceElement={reduceElement}
            currentOrderItems={currentOrderItems}
        />

        <View style={[tw`mt-10 flex flex-row justify-between w-full`]}>
            <Text style={[tw`text-3xl`, GeneralStyle.title]}>Totale</Text>
            <Text style={[tw`text-3xl text-right pr-5`, GeneralStyle.text]}>{total}€</Text>
        </View>

        <View style={[tw`mt-10`]}>
            <Text style={[tw`text-4xl `, GeneralStyle.title]}>
                Dove vieni a prendere l'ordine?
            </Text>
            {readonly ?
                <Text style={[tw`text-4xl mt-5`, GeneralStyle.text]}>
                    {placeSelected?.siteName}, {placeSelected?.siteAddress}
                </Text> :
                <View style={[tw`flex flex-col justify-between w-full`]}>
                    <Dropdown
                        disable={readonly}
                        data={places}
                        itemContainerStyle={[tw``, GeneralStyle.submitYellow]}
                        style={[tw`mt-2 rounded-md px-5 py-2`, GeneralStyle.submitYellow]}
                        itemTextStyle={{ fontFamily: FontFamilyName, color: GREEN }}
                        selectedTextStyle={[{ fontFamily: FontFamilyName, color: ORANGE }, GeneralStyle.submitYellow]}
                        placeholderStyle={{ fontFamily: FontFamilyName, color: GREEN }}
                        activeColor={YELLOW}
                        labelField="siteName"
                        valueField="siteCode"
                        placeholder="Seleziona una pizza"
                        value={placeSelected}
                        onChange={(item) => {
                            onChangePlace(item);
                        }}
                    />
                    {placeSelected ?
                        <View
                            style={[tw`mt-1 flex flex-row w-full items-center`]}
                        >
                            <Icon
                                style={[tw``, GeneralStyle.passwordShow]}
                                name={'map-marker'}
                                size={20}
                                color="#FFF" />
                            <Text style={[tw`text-4xl ml-2`, GeneralStyle.text]}>
                                {placeSelected?.siteAddress}
                            </Text>
                        </View>
                        : <></>
                    }
                </View>
            }
        </View>

        <SafeAreaView>
            <Text style={[tw`text-4xl  mt-5`, GeneralStyle.title]}>
                Quando vieni a ritirare l'ordine?
            </Text>
            {placeSelected ?
                <View style={[tw`mt-1 flex flex-col w-full items-center`]}>
                    <View style={[tw`mt-1 flex flex-col w-full items-center`]}>
                        <Text style={[tw`text-xl`, GeneralStyle.text]}>
                            Orario di servizio:
                        </Text>
                        <Text style={[tw`text-2xl`, GeneralStyle.text]}>
                            {printTime(minTime)} - {printTime(maxTime)}
                        </Text>
                        <Text>Inserire un orario all'interno della fascia</Text>
                    </View>
                </View>
                : <></>
            }
            {dateSetup &&
                <View
                    style={[tw`my-5`]}>
                    <Text style={[tw`text-center mt-1 text-3xl`, GeneralStyle.text]}>
                        Hai selezionato {printTime(date)}
                    </Text>

                </View>}
            {!readonly && <Pressable onPress={showTimepicker} disabled={readonly}>
                <View
                    style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}>
                    <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Inserisci l'orario</Text>
                </View>
            </Pressable>
            }

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
        {!readonly ? <Pressable disabled={readonly} onPress={() => { preSendOrder(); }}>
            <View
                style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}>
                <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Invia Ordine</Text>
            </View>
        </Pressable> : <></>}
    </>;
};
