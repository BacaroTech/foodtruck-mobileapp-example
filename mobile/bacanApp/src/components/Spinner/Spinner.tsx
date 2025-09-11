import * as React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {
  BLACK,
  YELLOW,
} from 'src/utils';
import tw from 'twrnc';

const SpinnerStyle = StyleSheet.create({
    main: {
        backgroundColor: YELLOW,
        zIndex: 100,
        opacity: 0.5,
        height: 1500,
        width: 500,
    },

});
type SpinnerProp = {
    show: boolean;
}
const Spinner = (prop: SpinnerProp) => {
    return prop.show ? <View
        style={[tw`absolute bg-black h-full w-full`,
        SpinnerStyle.main]}>
        <ActivityIndicator
            color={BLACK}
        />
    </View> : <></>;
};

export { Spinner };
