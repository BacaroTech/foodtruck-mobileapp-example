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
import { BacaScreenProps } from 'src/core';
import { IMAGElogo } from 'src/images';
import { ErrorState } from 'src/models';
import {
  AppError,
  WHITE,
} from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import {
  messagePasswordFormat,
  validateEmail,
  validateEmptyFields,
  validatePassword,
  validatePhone,
} from 'src/utils/validate.utils';
import tw from 'twrnc';

import RegisterStyle from './RegisterStyle';

type RegisterScreenProps = {} & BacaScreenProps & any;

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    const messagePassword = messagePasswordFormat;

    const { doAsyncRegistration } = useAuthApi();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ErrorState>({ error: false });
    const [loading, setLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const registerFunction = () => {
        if (!validateEmptyFields([email, password, name, phone])) {
            setError({
                error: true,
                msg: 'Alcuni campi non sono valorizzati',
            });
            return;
        }
        if (!validatePhone(phone)) {
            setError({
                error: true,
                msg: 'Il campo telefono presenta un errore di formattazione',
            });
            return;
        }
        if (!validateEmail(email)) {
            setError({
                error: true,
                msg: 'Il campo email presenta un errore di formattazione',
            });
            return;
        }
        if (!validatePassword(password)) {
            setError({
                error: true,
                msg: 'Il campo password presenta un errore di formattazione',
            });
            return;
        }
        setError({
            error: false,
            msg: '',
        });
        setLoading(true);
        doAsyncRegistration(
            name,
            phone,
            email,
            password
        )
            .then(() => {
                setLoading(false);
                navigation.navigate('Login');
            })
            .catch((e) => {
                console.log(e.errorCode);
                setLoading(false);
                const message = (e as AppError).errorCode?.msg ?? '';

                setError({
                    error: true,
                    msg: `Errore durante la registrazione.${message}`,
                });
            });
    };
    const goToPrivacy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    const toogleShowPassword = () => {
        setHidePassword(v => !v);
    };
    return (
        <ScrollView style={[tw`h-full`, GeneralStyle.container]}>
            <Spinner show={loading} />
            <Image
                style={tw`m-auto mt-10 mb-5`}
                source={IMAGElogo} />
            <Text style={[tw`text-center text-7xl mb-10 `, GeneralStyle.title]}>Registrati</Text>
            <View style={[tw`pb-26`, RegisterStyle.secondContainer]}>
                {error.error && <ErrorMessage error={error.msg} />}
                <SafeAreaView style={tw`mx-10 mt-10 mb-5`}>

                    <TextInput
                        style={[GeneralStyle.input]}
                        onChangeText={valueUpdated => setName(valueUpdated)}
                        placeholder="Nome"
                        placeholderTextColor={WHITE}
                        autoCapitalize="none"
                        defaultValue={name}
                    />
                    <TextInput
                        style={[GeneralStyle.input]}
                        onChangeText={valueUpdated => setPhone(valueUpdated)}
                        placeholder="Telefono"
                        placeholderTextColor={WHITE}
                        autoCapitalize="none"
                        defaultValue={phone}
                    />
                    <TextInput
                        style={[GeneralStyle.input]}
                        onChangeText={valueUpdated => setEmail(valueUpdated)}
                        placeholder="Email"
                        placeholderTextColor={WHITE}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        defaultValue={email}
                    />
                    <View style={[
                        tw`flex flex-row items-center w-full`,
                        GeneralStyle.containerPassword]}>
                        <TextInput
                            style={[tw`flex-1`,GeneralStyle.inputPassword]}
                            onChangeText={valueUpdated => setPassword(valueUpdated)}
                            placeholder="Password"
                            placeholderTextColor={WHITE}
                            secureTextEntry={hidePassword}
                            autoCapitalize="none"
                            defaultValue={password}
                        />
                        <Pressable onPress={() => toogleShowPassword()}>
                            <Icon
                                style={[tw`flex-none`, GeneralStyle.passwordShow]}
                                name={hidePassword ? 'eye' : 'eye-off'}
                                size={40}
                                color="#FFF" />
                        </Pressable>
                    </View>
                    <Text style={[RegisterStyle.link]}>
                        {messagePassword}
                    </Text>

                    <View
                        style={[tw`mt-5 w-full flex flex-col justify-center`, GeneralStyle.submitOrange]}
                    ><Pressable
                        onPress={() => registerFunction()}>
                            <Text style={[tw`text-center`, GeneralStyle.yellow, GeneralStyle.fontSubmit]}>Invia</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={() => goToPrivacy()}>
                        <Text style={[GeneralStyle.privacy]}>
                            Privacy Policy
                        </Text>
                    </Pressable>
                </SafeAreaView>
            </View>
        </ScrollView>
    );
};

export { RegisterScreen };
