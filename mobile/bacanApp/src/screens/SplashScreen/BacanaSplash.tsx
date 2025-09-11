import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';

import {
  Image,
  Text,
  View,
} from 'react-native';
import { useCurrentUser } from 'src/context';
import {
  IRouteNameList,
  BacaScreenProps,
} from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { IMAGElogo } from 'src/images';
import { GeneralStyle } from 'src/utils';
import tw from 'twrnc';

/**
 * Check out https://github.com/crazycodeboy/react-native-splash-screen for a better splash screen
 * @param param0
 * @returns
 */
export const BacarotruckSplashScreen = ({ }: BacaScreenProps): React.JSX.Element => {
  const navigation = useBacaNavigation();
  const { data } = useCurrentUser();
  const isFocused = useIsFocused();

  useEffect(() => {

    let page: IRouteNameList = 'Login';
    if (data?.isAuthenticated) {
      if (data.authData?.user.r === 'TRUCK') {
        page = 'NightOrders';
      } else {
        page = 'Home';
      }
    }

    setTimeout(() => {
      if (isFocused) {
        navigation.navigate(page);
      } else {
        console.warn("Splash is not focused")
      }
    }, 3000);
  }, [data, isFocused]);

  return (
    <View style={[tw`h-full`, GeneralStyle.container]}>
      <Image
        style={tw`m-auto mt-50 mb-5 rounded-full`}
        source={IMAGElogo} />
      <Text style={[tw`text-center text-8xl `, GeneralStyle.title]}>Bacarotruck</Text>
      <Text style={[tw`text-center text-5xl mt-3 `, GeneralStyle.title]}>Food Truck</Text>
    </View>
  );
};
