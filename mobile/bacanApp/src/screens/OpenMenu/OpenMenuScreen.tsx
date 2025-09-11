import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Header from 'src/components/Header/Header';
import { SIGN_IN_KEY } from 'src/config';
import {
  useCurrentOrder,
  useCurrentStore,
  useCurrentUser,
} from 'src/context';
import { BacaScreenProps } from 'src/core';
import tw from 'twrnc';

import OpenMenuStyle from './OpenMenuStyle';

type MenuItem = {
    label: string,
    nav: string
}
type OpenMenuScreenProp = {} & BacaScreenProps & any;
const OpenMenuScreen = ({ navigation }: OpenMenuScreenProp) => {
    const { storage } = useCurrentStore();
    const { data, auth } = useCurrentUser();
    const { resetData } = useCurrentOrder();
    const [menuView, setMenuView] = useState<MenuItem[]>([]);

    const menu: MenuItem[] = useMemo(() => ([
        {
            label: 'Home',
            nav: 'Home',
        }, {
            label: 'Carrello',
            nav: 'CheckOut',
        }, {
            label: 'Ultimo Ordine',
            nav: 'OrderStatus',
        }, {
            label: 'Profilo',
            nav: 'Profile',
        }, {
            label: 'Dove ci trovi',
            nav: 'WhereAre',
        }, {
            label: 'Logout',
            nav: 'Logout',
        },
    ]), []);

    const menuTruck: MenuItem[] = useMemo(() => ([
        {
            label: 'Ordini',
            nav: 'NightOrders',
        }, {
            label: 'Logout',
            nav: 'Logout',
        },
    ]), []);

    const goSection = (menuItem: any) => {
        if (menuItem.nav === 'Logout') {
            storage.clearMapForKey(SIGN_IN_KEY)
                .then(_ => {
                    resetData();
                    auth(null);
                    navigation.navigate('Login');
                }).catch(_ => {
                    resetData();
                    auth(null);
                    navigation.navigate('Login');
                });
        } else {
            navigation.navigate(menuItem.nav);
        }
    };

    useEffect(() => {
        if (data.authData?.user.r === 'TRUCK') {
            setMenuView(menuTruck);
        } else {
            setMenuView(menu);
        }
    }, [data.authData, menu, menuTruck]);

    return (
        <ScrollView style={[tw`h-full`, OpenMenuStyle.containerYellow]}>
            <Header subtitle={'Food Truck'} />
            <View style={[tw`px-10`]}>
                {menuView.map((menuItem) => {
                    return (
                        <Pressable onPress={() => goSection(menuItem)}>
                            <Text key={menuItem.label} style={[tw`text-4xl mb-5`, OpenMenuStyle.textGreen]}>
                                {menuItem.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export { OpenMenuScreen };
