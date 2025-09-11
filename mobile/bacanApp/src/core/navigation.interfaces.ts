import {
  CategoryView,
  DishView,
} from 'src/models';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type ProductRouteParam = { name: string, category: CategoryView };
export type RootStackParamList = {
  Splash: { name: string } | undefined,
  Home: { name: string } | undefined, // undefined because you aren't passing any params to the home screen
  Profile: { name: string } | undefined;
  Login: { name: string } | undefined;
  Register: { name: string } | undefined,
  PrivacyPolicy: { name: string } | undefined,
  Product: ProductRouteParam,
  CustomProduct: { name: string, dish: DishView, description: string } | undefined,
  Products: { name: string } | undefined,
  ChangePassword: { name: string } | undefined,
  OrderStatus: { name: string } | undefined,
  Menu: { name: string } | undefined,
  CheckOut: { name: string } | undefined,
  WhereAre: { name: string } | undefined,
  NightOrders: { name: string } | undefined,
  DetailSingleOrder: { orderID: number } | undefined,
  Postpore: { orderID: number, user: string, oldHour: string} | undefined
};

export type RouteNameList = {
  'Home': undefined,
  'Profile': undefined,
  'Splash': undefined,
  'Login': undefined,
  'Register': undefined,
  'PrivacyPolicy': undefined,
  'Products': undefined,
  'CustomProduct': undefined,
  'ChangePassword': undefined,
  'OrderStatus': undefined,
  'Menu': undefined,
  'CheckOut': undefined,
  'WhereAre': undefined,
  'NightOrders': undefined,
  'DetailSingleOrder': undefined
  'Postpore': undefined
}
export type RootStackParamNameList = keyof RootStackParamList;
export type IRouteNameList = keyof RouteNameList;

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  IRouteNameList
>;

export type BacaScreenProps = NativeStackScreenProps<
  RootStackParamList,
  IRouteNameList
>;
