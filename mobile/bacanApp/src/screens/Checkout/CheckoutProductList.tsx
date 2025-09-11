import React from 'react';

import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Allergens } from 'src/components';
import {
  IMAGEminus,
  IMAGEplus,
} from 'src/images';
import { OrderItemView } from 'src/models';
import { GeneralStyle } from 'src/utils';
import tw from 'twrnc';

import CheckoutStyle from '.';

export type CheckoutProductListProp = {
    disabled: boolean,
    currentOrderItems: OrderItemView[];
    addElement: (i: number) => void;
    reduceElement: (i: number) => void;
}
export const CheckoutProductList = (prop: CheckoutProductListProp) => {
    const { disabled, currentOrderItems, addElement, reduceElement } = prop;
    const _currentOrderItems = currentOrderItems.sort((a,b) => a.dish.id - b.dish.id);
    return <View style={[tw`flex flex-col w-full`]}>
        {_currentOrderItems.map((product, i) => {
            return (
                <>
                    {product.quantity > 0 &&
                        <View style={tw`my-4`} key={`${product.dish.code}_${i}`}>
                            <View style={tw`flex flex-row justify-between w-full`}>
                                <Text style={[tw`text-4xl w-3/4`, GeneralStyle.title]}>
                                    {product.dish.name}
                                </Text>
                                <Text style={[tw`text-3xl w-content`, GeneralStyle.text]}>{product.dish.price}€</Text>

                            </View>

                            <Text style={[tw`text-2xl w-full`, GeneralStyle.text]}>
                                {product.dish.description}
                            </Text>
                            <View style={[tw`w-full`]}>
                                <Allergens product={product.dish} />
                            </View>
                            <Text style={[tw`text-3xl  mt-2`, GeneralStyle.title]}>
                                Aggiunte
                            </Text>

                            {(product.extra).map((add, j) => {
                                return (
                                    <View style={CheckoutStyle.adds} key={add.name + '_' + j}>
                                        <Text style={[tw`text-2xl mr-5`, GeneralStyle.text]}>{add.name}</Text>
                                        <Text style={[tw`text-2xl`, GeneralStyle.text]}>{add.price}€</Text>
                                    </View>
                                );
                            })}
                            {
                                product.extra.length === 0 ?
                                    <Text style={[tw`text-2xl `, GeneralStyle.text]}>
                                        nessuna
                                    </Text>
                                    : <></>
                            }


                            <Text style={[tw`text-3xl mt-1`, GeneralStyle.title]}>
                                Rimozioni
                            </Text>
                            <Text style={[tw`text-2xl `, GeneralStyle.text]}>
                                {product.note}
                            </Text>

                            <View style={tw`flex flex-row justify-between w-full `}>
                                <View style={tw`flex flex-row justify-center`}>
                                    <Text style={[tw`text-2xl`, GeneralStyle.text, GeneralStyle.textOrangeOverGreen]}>
                                        Quantità:
                                    </Text>
                                    <Text style={[tw`ml-4 text-3xl`, GeneralStyle.text]}>
                                        {product.quantity}
                                    </Text>
                                </View>
                                {disabled ? <></> :
                                    <View style={tw`flex flex-row gap-10`}>
                                        <View style={[tw``]}>
                                            <Pressable disabled={disabled} onPress={() => { addElement(i); }} >
                                                <Image
                                                    style={tw`w-10 h-10 rounded-full`}
                                                    source={IMAGEplus} />
                                            </Pressable>
                                        </View>
                                        <View style={[tw``]}>
                                            <Pressable disabled={disabled} onPress={() => { reduceElement(i); }}>
                                            <Image
                                                    style={tw`w-10 h-10 rounded-full`}
                                                    source={IMAGEminus} />
                                            </Pressable>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    }
                </>
            );
        })}
    </View>;
};
