import * as React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { IMAGElogo } from 'src/images';
import { FontFamilyName } from 'src/utils/GeneralStyle';
import {
  ORANGE_TXT_OVER_YELLOW,
  YELLOW,
} from 'src/utils/myPalete';
import tw from 'twrnc';

export type HeaderTitleType =
    | 'Custom'
    | 'Food Truck'
    | 'Carrello'
    | 'Dove siamo';

type HeaderProp = {
    subtitle: HeaderTitleType | string;
}
const Header = (prop: HeaderProp) => {

    return (
        <View
            style={[tw`h-full relative`, HeaderStyle.secondContainer]}>
            <Image
                style={tw`m-auto mt-5 mb-5 w-30 h-30 rounded-full`}
                source={IMAGElogo} />
            <Text style={[tw`text-center text-7xl `, HeaderStyle.title]}>
                Bacarotruck
            </Text>
            <Text style={[tw`text-center text-5xl `, HeaderStyle.title]}>
                {prop.subtitle}
            </Text>
        </View>
    );
};

const HeaderStyle = StyleSheet.create({
    title: {
        color: ORANGE_TXT_OVER_YELLOW,
        fontFamily: FontFamilyName,
    },
    secondContainer: {
        backgroundColor: YELLOW,
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        height: 370,
    },
});

export default Header;
export { Header };
