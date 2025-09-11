/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useUserApi } from 'src/api';
import {
  Footer,
  Header,
} from 'src/components';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { ProfileView } from 'src/models';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

import { useIsFocused } from '@react-navigation/native';

type ProfileScreenProp = {} & BacaScreenProps & any;

const ProfileScreen = ({ }: ProfileScreenProp) => {
    const navigation = useBacaNavigation();
    const isFocused = useIsFocused();
    const { getMe } = useUserApi();
    const [refreshing, setRefreshing] = useState(false);
    const [profile, setProfile] = useState<ProfileView>({
        email: '',
        phone: '',
        name: '',
    });
    const onRefresh = useCallback(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        const me = await getMe();
        setRefreshing(false);
        if (me) {
            setProfile(me);
        }
    }, []);

    const goChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const goToPrivacy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    useEffect(() => {
        onRefresh();
    }, [isFocused]);

    return (
        <ScrollView style={[tw`h-full`, GeneralStyle.container]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Header subtitle={'Profilo'} />
            <View style={[tw`p-5`]}>
                <Text style={[tw`text-center text-5xl mb-5`, GeneralStyle.text]}>
                    {profile.name}
                </Text>
                <Text style={[tw`text-3xl `, GeneralStyle.title]}>
                    Email
                </Text>
                <Text style={[tw`text-2xl `, GeneralStyle.text]}>
                    {profile.email}
                </Text>

                <Text style={[tw`text-3xl  mt-5`, GeneralStyle.title]}>
                    Telefono
                </Text>
                <Text style={[tw`text-2xl `, GeneralStyle.text]}>
                    {profile.phone}
                </Text>

                <Text style={[tw`text-3xl  mt-5`, GeneralStyle.title]}>
                    Password
                </Text>
                <Pressable onPress={() => { goChangePassword(); }}>
                    <View
                        style={[tw`mt-5`, GeneralStyle.submit, GeneralStyle.submitYellow]}
                    >
                        <Text style={[tw`text-center mt-1 text-xl`, GeneralStyle.title]}>Cambia password</Text>
                    </View>
                </Pressable>
                <View
                    style={[tw`mt-5`]}
                >
                    <Pressable onPress={() => goToPrivacy()}>
                        <Text style={[GeneralStyle.privacy]}>
                            Privacy Policy
                        </Text>
                    </Pressable>
                </View>
            </View>
            <Footer />
        </ScrollView>
    );
};

export { ProfileScreen };
