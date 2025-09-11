import React, { useState } from 'react';

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthApi } from 'src/api';
import { Spinner } from 'src/components';
import { ErrorMessage } from 'src/components/ErrorMessage/ErrorMessage';
import { SIGN_IN_KEY } from 'src/config';
import {
  useCurrentStore,
  useCurrentUser,
} from 'src/context';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { IMAGElogo } from 'src/images';
import { AuthResponseDTO } from 'src/models';
import { AppError } from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import { WHITE } from 'src/utils/myPalete';
import {
  validateEmail,
  validateEmptyFields,
} from 'src/utils/validate.utils';
import tw from 'twrnc';

import LoginStyle from './LoginStyle';

type ErrorState = {
    error: boolean,
    msg?: string;
}
type LoginScreenProps = {

} & BacaScreenProps & any;

const LoginScreen = ({ }: LoginScreenProps) => {
    const navigation = useBacaNavigation();
    const { storage } = useCurrentStore();
    const { auth } = useCurrentUser();
    const { doAsyncLogin } = useAuthApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ErrorState>({ error: false });
    const [loading, setLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const goToPrivacy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    const goToRegistration = () => {
        navigation.navigate('Register');
    };

    const storageAuthData = (response: AuthResponseDTO) => {
        storage.save({
            key: SIGN_IN_KEY,
            data: { ...response },
            expires: null,
        }).then(_ => {
            setLoading(false);
            auth(response);
            if (response.user.r === 'TRUCK') {
                navigation.navigate('NightOrders');
            } else {
                navigation.navigate('Home');
            }

        }).catch(_ => {
            setLoading(false);
            setError({
                error: true,
                msg: 'Errore in login. Riprovare...',
            });

        });
    };

    const authLogin = () => {
        setLoading(true);
        doAsyncLogin(email, password)
            .then((response) => {
                storageAuthData(response);
            })
            .catch((e) => {

                const message = (e as AppError).errorCode?.msg ?? 'Errore generico.';

                setLoading(false);
                console.error('LoginError', e);
                setError({
                    error: true,
                    msg: message,
                });
            });
    };

    const login = () => {
        if (!validateEmptyFields([email, password])) {
            setError({
                error: true,
                msg: 'la password e la mail devono essere entrambi valorizzati',
            });
            return;
        }
        if (!validateEmail(email)) {
            setError({
                error: true,
                msg: 'la mail non è stata scritta corrattemente',
            });
            return;
        }
        setError({
            error: false,
        });

        authLogin();
    };

    const toogleShowPassword = () => {
        setHidePassword(v => !v);
    };

    return (
        <ScrollView style={[tw`h-full`, GeneralStyle.container]}>
            <Spinner show={loading} />
            <View style={[tw`h-full`, GeneralStyle.container]}>
                <Image
                    style={tw`m-auto mt-10 mb-5`}
                    source={IMAGElogo} />
                <Text style={[tw`text-center text-8xl mb-10 `, GeneralStyle.title]}>Login</Text>
                <View style={[tw`h-full mb-30`, LoginStyle.secondContainer]}>
                    {error.error && <ErrorMessage error={error.msg} />}
                    <SafeAreaView style={tw`mx-10 mt-10 mb-5`}>
                        <TextInput
                            style={[GeneralStyle.input]}
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={WHITE}
                            onChangeText={valueUpdated => setEmail(valueUpdated)}
                            defaultValue={email}
                        />
                        <View style={[
                            tw`flex flex-row items-center w-full`,
                            GeneralStyle.containerPassword]}>
                            <TextInput
                                style={[tw`flex-1`, GeneralStyle.inputPassword]}
                                placeholder="Password"
                                autoCapitalize="none"
                                placeholderTextColor={WHITE}
                                onChangeText={valueUpdated => setPassword(valueUpdated)}
                                defaultValue={password}
                                secureTextEntry={hidePassword}
                            />
                            <Pressable onPress={() => toogleShowPassword()}>
                                <Icon
                                    style={[tw`flex-none`, GeneralStyle.passwordShow]}
                                    name={hidePassword ? 'eye' : 'eye-off'}
                                    size={40}
                                    color="#FFF" />
                            </Pressable>
                        </View>
                        <View style={[tw`mt-5`, GeneralStyle.submitOrange]} >
                            <Pressable onPress={() => login()}>
                                <Text style={[tw`text-center mt-1`, GeneralStyle.yellow]}>Accedi</Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={() => goToRegistration()}>
                            <Text style={[LoginStyle.account]}>
                                Non hai un account? {'\n'} Creane uno al volo!
                            </Text>
                        </Pressable>

                        <Pressable onPress={() => goToPrivacy()}>
                            <Text style={[GeneralStyle.privacy]}>
                                Privacy Policy
                            </Text>
                        </Pressable>
                    </SafeAreaView>
                </View>
            </View>
        </ScrollView>
    );
};

export { LoginScreen };
