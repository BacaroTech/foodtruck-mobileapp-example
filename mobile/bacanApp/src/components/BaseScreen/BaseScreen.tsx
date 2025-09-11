/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  RefreshControl,
  RefreshControlProps,
  ScrollView,
} from 'react-native';
import {
  useActionOrder,
  useCommonData,
  useCurrentOrder,
} from 'src/context';
import {
  ErrorState,
  IChildrenReactNode,
} from 'src/models';
import { GeneralStyle } from 'src/utils';
import tw from 'twrnc';

import {
  ErrorMessage,
  Footer,
  Header,
  HeaderTitleType,
} from '..';
import {
  BaseScreenContext,
  IBaseScreen,
  IBaseScreenContext,
  initialBaseScreenData,
} from './base-screen-context';

type BaseScreenProp = {
  customSubtitle?: string;
  subtitle?: HeaderTitleType;
  refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
} & IChildrenReactNode;

const BaseScreen = ({ children, subtitle, customSubtitle }: BaseScreenProp) => {

  const _subtitle = customSubtitle ? customSubtitle : (subtitle ? subtitle : '');
  const [refreshing, setRefreshing] = useState(false);
  const { data, fetchCurrentCart } = useCurrentOrder();
  const commonData = useCommonData();
  const { fetchData } = useActionOrder();

  const [baseScreenData, setBaseScreenData] = useState<IBaseScreen>(initialBaseScreenData);

  const onRefresh = useCallback(() => {
    fetchCurrentCart();
    fetchData();
    setRefreshing(true);
  }, []);

  const setData = useCallback((_data: IBaseScreen) => {
    setBaseScreenData(_data);
  }, [setBaseScreenData]);

  const setError = useCallback((error: ErrorState) => {
    setBaseScreenData((_d) => ({
      ..._d,
      error,
    }));
  }, [setBaseScreenData]);

  const contextValue = useMemo<IBaseScreenContext>(() => ({
    data: { ...baseScreenData },
    setData,
    setError,
  }), [baseScreenData, setData, setError]);

  useEffect(() => {
    setRefreshing(false);
  },[ data, commonData]);

  return <BaseScreenContext.Provider value={contextValue} >
    <ScrollView style={[tw`h-full`, GeneralStyle.container]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header subtitle={_subtitle} />
      {baseScreenData.error?.error && <ErrorMessage error={baseScreenData.error.msg} />}
      {children}
      <Footer />
    </ScrollView>
  </BaseScreenContext.Provider>;
};

export { BaseScreen };
