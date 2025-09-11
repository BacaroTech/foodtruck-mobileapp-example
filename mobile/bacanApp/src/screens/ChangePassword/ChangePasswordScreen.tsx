/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useAuthApi,
  useUserApi,
} from 'src/api';
import { Spinner } from 'src/components';
import { ErrorMessage } from 'src/components/ErrorMessage/ErrorMessage';
import { SIGN_IN_KEY } from 'src/config';
import {
  useCurrentOrder,
  useCurrentStore,
  useCurrentUser,
} from 'src/context';
import { BacaScreenProps } from 'src/core';
import { useBacaNavigation } from 'src/core/BacarotruckNavigation';
import { IMAGElogo } from 'src/images';
import { ProfileView } from 'src/models';
import {
  messagePasswordFormat,
  validateEmptyFields,
  validatePassword,
} from 'src/utils';
import GeneralStyle from 'src/utils/GeneralStyle';
import { WHITE } from 'src/utils/myPalete';
import tw from 'twrnc';

import { useIsFocused } from '@react-navigation/native';

import RegisterStyle from '../Register/RegisterStyle';
import ChangePasswordStyle from './changePasswordStyle';

type ChangePasswordScreenProps = {} & BacaScreenProps & any;
type ErrorState = {
    error: boolean,
    msg?: string;
}
const ChangePasswordScreen = ({ }: ChangePasswordScreenProps) => {
    const messagePassword = messagePasswordFormat;
    const navigation = useBacaNavigation();

    const isFocused = useIsFocused();
    const { storage } = useCurrentStore();
    const { resetData } = useCurrentOrder();
    const { auth } = useCurrentUser();
    const { doAsyncLogin } = useAuthApi();
    const { doChangePassword, getMe } = useUserApi();


    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<ProfileView>({
        email: '',
        phone: '',
        name: '',
    });
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);

    const [error, setError] = useState<ErrorState>({ error: false });
    const [refreshing, setRefreshing] = useState(false);

    const toogleCurrentPassword = () => {
        setHideCurrentPassword(v => !v);
    };
    const toogleNewPassword = () => {
        setHideNewPassword(v => !v);
    };
    const toogleShowPasswordNew = () => {
        setHideConfirmPassword(v => !v);
    };

    const changeFunction = () => {

        if (!validateEmptyFields([currentPassword, confirmPassword, newPassword])) {
            setError({
                error: true,
                msg: 'Alcuni campi non sono valorizzati',
            });
            return;
        }
        if (currentPassword === newPassword) {
            setError({
                error: true,
                msg: 'La nuova password deve essere diversa dalla precedente',
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            setError({
                error: true,
                msg: 'La password nuova e quella di conferma sono diverse',
            });
            return;
        }
        if (!validatePassword(confirmPassword)) {
            setError({
                error: true,
                msg: 'Il campo nuova password presenta un errore di formattazione',
            });
            return;
        }
        checkOldAndChange();
    };

    const updatePassword = () => {

        setLoading(true);

        doChangePassword(newPassword)
            .then(() => {
                setLoading(false);
                console.log('Password aggiornata con successo');
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
            })
            .catch((e) => {
                setLoading(false);
                console.error('Update Password', e);
                setError({
                    error: true,
                    msg: 'Errore durante l\'aggiornamento della password',
                });
            });
    };

    const checkOldAndChange = () => {

        setLoading(true);

        doAsyncLogin(profile.email, currentPassword)
            .then(() => {

                setLoading(false);

                updatePassword();
            })
            .catch((e) => {
                console.log('Error', e);
                setLoading(false);
                setError({
                    error: true,
                    msg: 'La password corrente è errata',
                });
            });

    };

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
    useEffect(() => {
        onRefresh();
    }, [isFocused]);
    return (
        <ScrollView style={[tw`h-full`, GeneralStyle.container]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Spinner show={loading} />

            <Image
                style={tw`m-auto mt-20`}
                source={IMAGElogo} />
            <Text style={[tw`text-center text-6xl mb-10`, GeneralStyle.title]}>
                Cambia Password
            </Text>
            <View style={[tw`pb-20`, ChangePasswordStyle.secondContainer]}>
                {error.error && <ErrorMessage error={error.msg} />}
                <SafeAreaView style={tw`mx-10 mt-10`}>
                    <View style={[
                        tw`flex flex-row items-center w-full`,
                        GeneralStyle.containerPassword]}>
                        <TextInput
                            style={[tw`flex-1`, GeneralStyle.inputPassword]}
                            placeholder="Password Corrente"
                            placeholderTextColor={WHITE}
                            onChangeText={valueUpdated => onChangeCurrentPassword(valueUpdated)}
                            secureTextEntry={hideCurrentPassword}
                        />
                        <Pressable onPress={() => toogleCurrentPassword()}>
                            <Icon
                                style={[tw`flex-none`, GeneralStyle.passwordShow]}
                                name={hideCurrentPassword ? 'eye' : 'eye-off'}
                                size={40}
                                color="#FFF" />
                        </Pressable>
                    </View>
                    <View style={[
                        tw`flex flex-row items-center w-full`,
                        GeneralStyle.containerPassword]}>
                        <TextInput
                            style={[tw`flex-1`, GeneralStyle.inputPassword]}
                            placeholder="Nuova Password"
                            placeholderTextColor={WHITE}
                            onChangeText={valueUpdated => onChangeNewPassword(valueUpdated)}
                            secureTextEntry={hideNewPassword}
                        />
                        <Pressable onPress={() => toogleNewPassword()}>
                            <Icon
                                style={[tw`flex-none`, GeneralStyle.passwordShow]}
                                name={hideNewPassword ? 'eye' : 'eye-off'}
                                size={40}
                                color="#FFF" />
                        </Pressable>
                    </View>
                    <Text style={[tw`mx-5 mt-5`, RegisterStyle.link]}>
                        {messagePassword}
                    </Text>

                    <View style={[
                        tw`flex flex-row items-center w-full`,
                        GeneralStyle.containerPassword]}>
                        <TextInput
                            style={[tw`flex-1`, GeneralStyle.inputPassword]}
                            placeholderTextColor={WHITE}
                            onChangeText={valueUpdated => onChangeConfirmPassword(valueUpdated)}
                            placeholder="Conferma password"
                            secureTextEntry={hideConfirmPassword}
                        />
                        <Pressable onPress={() => toogleShowPasswordNew()}>
                            <Icon
                                style={[tw`flex-none`, GeneralStyle.passwordShow]}
                                name={hideConfirmPassword ? 'eye' : 'eye-off'}
                                size={40}
                                color="#FFF" />
                        </Pressable>
                    </View>
                    <View style={[tw`mt-10 w-full flex flex-col justify-center`, GeneralStyle.submitOrange]}>
                        <Pressable
                            onPress={() => changeFunction()}
                        >
                            <Text style={[tw`text-center`, GeneralStyle.yellow, GeneralStyle.fontSubmit]}>Cambia</Text>
                        </Pressable>
                    </View>
                    <Text style={[tw`mx-5 mt-5 text-small`, GeneralStyle.textOrange]}>
                        Al termine dell'operazione dovrai effettuare la login nuovamente
                    </Text>

                </SafeAreaView>
            </View>
        </ScrollView>
    );
};

export { ChangePasswordScreen };
