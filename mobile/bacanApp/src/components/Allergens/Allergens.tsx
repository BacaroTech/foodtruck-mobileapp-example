import React from 'react';

import {
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';
import { IMAGEerrore } from 'src/images';
import { DishView } from 'src/models';
import { allergensMapImage } from 'src/utils';
import tw from 'twrnc';

export const Allergens = ({ product }: { product: DishView }) => {

    const mapImage = allergensMapImage;

    const traslate: (allergen: string) => ImageSourcePropType = (allergen: string) => {
        const find = mapImage.get(allergen);
        return find ? find : IMAGEerrore;
    };

    if (product.allergens.length === 0) {
        return <View />;
    }

    return <View style={[tw`flex flex-row flex-wrap`]}>
        {product.allergens.map((allergen, i) => {
            return (
                <Image
                    key={`${allergen.code}_${i}`}
                    style={tw`w-8 h-8 rounded-full mr-3`}
                    source={traslate(allergen.code)} />
            );
        })}
    </View>;
};
