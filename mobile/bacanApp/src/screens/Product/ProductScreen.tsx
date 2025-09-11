/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useDishesApi } from 'src/api/dishes';
import {
  Allergens,
  BaseScreen,
  Spinner,
} from 'src/components';
import {
  CurrentOrderStatus,
} from 'src/components/CurrentOrderStatus/CurrentOrderStatus';
import { useCurrentOrder } from 'src/context';
import {
  ProductRouteParam,
  BacaScreenProps,
} from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { IMAGEplus } from 'src/images';
import { t } from 'src/location';
import {
  DishView,
  OrderDTO,
} from 'src/models';
import { isCategoryDescriptionShowing } from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

type HomeScreenProp = BacaScreenProps;

const InternalProductScreen = ({ route }: HomeScreenProp) => {
    const navigation = useBacaNavigation();
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loading, setLoading] = useState(false);

    const { doAsyncDishes } = useDishesApi();
    const param = (route.params as ProductRouteParam);
    const { category } = param;

    const categoryDescriptionShowing: boolean = isCategoryDescriptionShowing(category.code);
    const [products, setProducts] = useState<DishView[]>([]);
    const {
        data,
        loading: loadingOrder,
    } = useCurrentOrder();
    const currentOrder: OrderDTO = useMemo(() => {
        return data.cartOrderSaved || { ordersItems: [] };
    }, [data]);

    const { readonly } = data;

    const goCustomProduct = (product: DishView) => {
        if (currentOrder?.stateOrderCode === 'SEND') {
            Alert.alert('Hai un già inviato un ordine');
        } else {
            navigation.navigate('CustomProduct', {
                dish: product,
                name: product.name,
                description: product.description,
            } as any);
        }
    };

    useEffect(() => {

        const fetchCategories = async () => {
            setLoadingProduct(true);
            try {
                const _data = await doAsyncDishes(category);
                if (_data) {
                    setProducts(_data);
                }
            } catch (error) {
                console.error('Fetch Categories', error);
            }

            setLoadingProduct(false);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        setLoading(loadingProduct || loadingOrder);
    }, [
        loadingProduct,
        loadingOrder,
    ]);

    return (
        <>
            <Spinner show={loading} />

            <CurrentOrderStatus currentOrder={currentOrder} />
            {categoryDescriptionShowing ? <View style={[tw`px-5 w-full`]}>
                <Text style={[tw`text-lg min-h-15 max-h-40 w-full my-2`, GeneralStyle.text]}>
                    {t(`customer.product.desc.${category.code}`)}
                </Text>

            </View> : <></>}
            <View style={[tw`p-5 flex flex-col w-full`]}>
                {products.map((product, i) => {
                    return (
                        <View key={i} style={tw`mb-4 flex flex-col w-full`}>
                            <View style={tw`flex flex-row justify-between w-full`}>
                                <Text style={[tw`text-3xl w-2/3`, GeneralStyle.title]}>
                                    {product.name}
                                </Text>
                                <Text style={[tw`w-1/3 text-right`, GeneralStyle.textPrice]}>
                                    {product.price}€
                                </Text>
                            </View>
                            <Text style={[tw`text-2xl min-h-15 w-full`, GeneralStyle.text]}>
                                {product.description}
                            </Text>

                            <View style={tw`flex flex-row justify-between items-center`}>
                                <View style={tw`mt-3`}>
                                    <Allergens product={product} />
                                </View>
                                {!readonly && <View style={[tw`mt-3`]}>
                                    <Pressable onPress={() => goCustomProduct(product)}>
                                        <Image
                                            style={tw`w-15 h-15 rounded-full`}
                                            source={IMAGEplus} />
                                    </Pressable>
                                </View>}
                            </View>
                        </View>
                    );
                })}
            </View>
        </>
    );
};
const ProductScreen = (prop: HomeScreenProp) => {
    const { route } = prop;
    const param = (route.params as ProductRouteParam);
    const { category } = param;
    return <BaseScreen customSubtitle={category.name}>
        <InternalProductScreen {...prop} />
    </BaseScreen>;
};
export { ProductScreen };
