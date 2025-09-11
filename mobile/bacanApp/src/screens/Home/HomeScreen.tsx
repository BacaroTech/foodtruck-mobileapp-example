/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';
import {
  BaseScreen,
  Spinner,
} from 'src/components';
import {
  CurrentOrderStatus,
} from 'src/components/CurrentOrderStatus/CurrentOrderStatus';
import { useCommonData } from 'src/context';
import { useCurrentOrder } from 'src/context/baca-order-context';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { OrderDTO } from 'src/models';
import { CategoryView } from 'src/models/models.interfaces';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

import HomeStyle from './HomeStyle';

type HomeScreenProp = {} & BacaScreenProps;
const InternalHomeScreen = ({ }: HomeScreenProp) => {
    const navigation = useBacaNavigation();
    const [loadingHome, setLoadingHome] = useState(false);
    const {
        todayPlaces: places,
        categories,
        loading: loadingCommon,
    } = useCommonData();

    const {
        data,
        loading: loadingOrder,
     } = useCurrentOrder();

     const currentOrder: OrderDTO = useMemo(() => {
        return data.cartOrderSaved || { ordersItems: [] };
    }, [data]);

    const goToProduct = (category: CategoryView) => {
        navigation.navigate('Products', { category: category } as any);
    };

    useEffect(()=> {
        setLoadingHome(loadingCommon || loadingOrder);
    }, [
        loadingCommon,
        loadingOrder,
    ]);

    return (
        <>
            <Spinner show={loadingHome}/>
            <CurrentOrderStatus currentOrder={currentOrder} />
            <View style={[tw`px-5`]}>
                <Text style={[tw`text-center text-5xl mt-10 mb-5`, GeneralStyle.title]}>
                    Oggi ci trovi
                </Text>
                {places.map((place, i) => {
                    return (
                        <Text key={i} style={[tw`text-center text-3xl`, GeneralStyle.text]}>
                            {place.siteName}
                        </Text>
                    );
                })}
            </View>
            <View style={[tw`px-5`]}>
                <Text style={[tw`text-center text-5xl mt-10`, GeneralStyle.title]}>
                    Ordina la tua cena messicana!
                </Text>
            </View>
            <View style={[tw`px-5`]}>
                {categories.map((categoryOBJ, i) => {
                    return (
                        <View key={i}>
                            <Pressable onPress={() => goToProduct(categoryOBJ)}>
                                <ImageBackground
                                    style={[tw`m-auto my-5 mb-5 w-75 h-75`]}
                                    source={categoryOBJ.img}
                                >
                                    <View style={[tw``, HomeStyle.innerFrame]}>
                                        <Text style={[tw`text-center`, HomeStyle.category]}>
                                            {categoryOBJ.name}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        </>
    );
};
const HomeScreen = ({ prop }: any) => {
    return <BaseScreen subtitle={'Food Truck'}>
        <InternalHomeScreen {...prop} />
    </BaseScreen>;
};
export { HomeScreen };
