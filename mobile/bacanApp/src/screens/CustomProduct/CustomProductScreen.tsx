import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Alert,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useOrdersApi } from 'src/api';
import {
  BaseScreen,
  Spinner,
} from 'src/components';
import { useCommonData } from 'src/context';
import { useCurrentOrder } from 'src/context/baca-order-context';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import {
  ExtrasAddedView,
  OrderDTO,
} from 'src/models';
import GeneralStyle from 'src/utils/GeneralStyle';
import {
  DARK_GREEN,
  ORANGE,
  WHITE,
  YELLOW,
} from 'src/utils/myPalete';
import tw from 'twrnc';

import CustomProductStyle from './CustomProductStyle';

type CustomProductScreenProp = {
    name: any;
    description: any;
    dish: any;
} & BacaScreenProps & any;

const InternalCustomProductScreen = ({
    name,
    description,
    dish,
}: CustomProductScreenProp) => {

    const navigation = useBacaNavigation();
    const { doAsyncAddDishCart } = useOrdersApi();
    const { data, fetchCurrentCart } = useCurrentOrder();

    const { extras } = useCommonData();
    const [loading, setLoading] = useState(false);

    const cartOrder: OrderDTO = useMemo(() => {
        return data.cartOrderSaved || { ordersItems: [] };
    }, [data]);

    const [note, setNote] = useState('');
    const [adds, setAdds] = useState<ExtrasAddedView[]>([]);

    const toggleSwitch = (value: boolean, i: number) => {

        const arr: ExtrasAddedView[] = [...adds];
        arr[i].status = !arr[i].status;

        setAdds(arr);
    };

    const goOrderStatus = () => {
        setLoading(true);
        const _cartOrder: OrderDTO = cartOrder.stateOrderCode === 'CART' ? { ...cartOrder } : { ordersItems: [] };
        doAsyncAddDishCart(_cartOrder, dish, adds, note, 1)
            .then(() => {
                fetchCurrentCart();
                setLoading(false);
                navigation.navigate('CheckOut');
            })
            .catch(async (error) => {
                fetchCurrentCart();
                console.error(error);
                setLoading(false);
                Alert.alert('ERRORE: Piatto NON aggiunto');
            });
    };
    useEffect(() => {
        const dataAddetView: ExtrasAddedView[] = extras.map(e => ({
            ...e,
            status: false,
        }));
        setAdds(dataAddetView);
    }, [extras]);

    return (
        <>
        <Spinner show={loading}/>
        <View style={[tw`p-5 flex flex-col w-full`]}>
            <Text style={[tw`text-4xl `, GeneralStyle.title]}>
                {name}
            </Text>
            <Text style={[tw`text-2xl w-full`, GeneralStyle.text]}>
                {description}
            </Text>

            <Text style={[tw`text-4xl mt-5`, GeneralStyle.title]}>
                Aggiunte
            </Text>

            {
                adds.map((add, i) => {
                    return (
                        <View style={CustomProductStyle.checkboxContainer} key={`${add.code}_${i}`}>
                            <Switch
                                trackColor={{ false: YELLOW, true: YELLOW }}
                                thumbColor={add.status ? ORANGE : WHITE}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(value: boolean) => toggleSwitch(value, i)}
                                value={add.status}
                            />
                            <Text style={[tw`text-2xl mr-4`, CustomProductStyle.label]}>{add.name}</Text>
                            <Text style={[tw`text-2xl`, CustomProductStyle.label]}>{add.price}€</Text>
                        </View>
                    );
                })
            }

            <Text style={[tw`text-4xl mt-5`, GeneralStyle.title]}>
                Rimozioni
            </Text>
            <Text style={[tw`text-2xl `, GeneralStyle.text]}>
                Vi chiediamo di inserire solo ciò che volete toglire dal piatto. Grazie!
            </Text>
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => setNote(text)}
                placeholder="Inserire eventuali rimozioni qui!"
                placeholderTextColor={DARK_GREEN}
                value={note}
                style={[tw`mt-2 text-xl pt-0`, CustomProductStyle.textArea]}
            />

            <Pressable onPress={() => goOrderStatus()}>
                <View
                    style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                >
                    <Text style={[tw`text-center`, GeneralStyle.textButtonYellowBG]}>
                        Aggiungi
                    </Text>
                </View>
            </Pressable>
        </View>
        </>
    );
};
const CustomProductScreen = (prop: any) => {
    const {
        name,
        description,
        dish,
    } = prop.route.params;
    return <BaseScreen subtitle={'Custom'}>
        <InternalCustomProductScreen name={name} description={description} dish={dish} />
    </BaseScreen>;
};
export { CustomProductScreen };
