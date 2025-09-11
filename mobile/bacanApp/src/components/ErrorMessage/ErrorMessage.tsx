import * as React from 'react';

import {
  Text,
  View,
} from 'react-native';
import GeneralStyle from 'src/utils/GeneralStyle';
import tw from 'twrnc';

type ErrorMessageProps = {
    error?: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
    const { error = '' } = props;//destrutturazione e assegnazione di un valore di default

    return (
        <View style={[tw`mt-10 mx-12 bg-red-500 rounded-3`]}>
            <Text style={[tw`py-1 px-5 text-xl text-center`,
            GeneralStyle.text]}>{error}</Text>
        </View>
    );
};

export { ErrorMessage };
