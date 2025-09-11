import React from 'react';

import RightMenu from 'src/components/RightMenu/RightMenu';
import {
  ProfileScreenNavigationProp,
  RootStackParamList,
} from 'src/core';
import {
  ChangePasswordScreen,
  CheckoutScreen,
  CustomProductScreen,
  DetailSingleOrderScreen,
  HomeScreen,
  LoginScreen,
  NightOrderScreen,
  OpenMenuScreen,
  OrderStatusScreen,
  PostporeScreen,
  ProductScreen,
  RegisterScreen,
  BacarotruckSplashScreen,
  WhereAreScreen,
} from 'src/screens';
import {
  PrivacyPolicyScreen,
} from 'src/screens/PrivacyPolicy/PrivacyPolicyScreen';
import { ProfileScreen } from 'src/screens/Profile/ProfileScreen';
import {
  DARK_GREEN,
  YELLOW,
} from 'src/utils';

import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const BacarotruckNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShadowVisible: false,
                    headerStyle: { 
                        backgroundColor: YELLOW
                    },
                    headerTitle: '',
                    headerRight: () => <RightMenu />,
                }}
            >
                <Stack.Screen
                    name="Splash"
                    component={BacarotruckSplashScreen}
                    options={{
                        title: 'Splash',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: 'Login',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        title: 'Register',
                        headerRight: () => { return (<></>) },
                        headerTintColor: YELLOW,
                        headerStyle: {
                            backgroundColor: DARK_GREEN,
                        },
                    }}
                />
                <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicyScreen}
                    options={{
                        title: 'Privacy',
                        headerRight: () => { return (<></>) },
                        headerTintColor: YELLOW,
                        headerStyle: {
                            backgroundColor: DARK_GREEN,
                        },
                    }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePasswordScreen}
                    options={{ title: 'ChangePassword' }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home', headerLeft: () => { return (<></>) }, }}
                />
                <Stack.Screen
                    name="Products"
                    component={ProductScreen}
                />
                <Stack.Screen
                    name="CustomProduct"
                    component={CustomProductScreen}
                />
                <Stack.Screen
                    name="OrderStatus"
                    component={OrderStatusScreen}
                />
                <Stack.Screen
                    name="Menu"
                    component={OpenMenuScreen}
                />
                <Stack.Screen
                    name="CheckOut"
                    component={CheckoutScreen}
                />
                <Stack.Screen
                    name="WhereAre"
                    component={WhereAreScreen}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name="NightOrders"
                    component={NightOrderScreen}
                    options={{
                        title: 'Night Order',
                        headerLeft: () => { return (<></>) },
                        headerRight: () => <RightMenu />
                    }}
                />
                <Stack.Screen
                    name="DetailSingleOrder"
                    component={DetailSingleOrderScreen}
                    options={{
                        title: 'Detail Single Order',
                        headerRight: () => { return (<RightMenu />) },
                    }}
                />
                <Stack.Screen
                    name="Postpore"
                    component={PostporeScreen}
                    options={{
                        title: 'Postpore',
                        headerRight: () => { return (<></>) },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const useBacaNavigation = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    return navigation;
};
export { BacarotruckNavigation, useBacaNavigation };
