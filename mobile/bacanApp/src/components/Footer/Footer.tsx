import * as React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { YELLOW } from 'src/utils/myPalete';
import tw from 'twrnc';

const Footer = () => {
    return (
        <View style={[tw`mt-15`, FooterStyle.footer]} />
    );
};

const FooterStyle = StyleSheet.create({
    footer: {
        height: 100,
        backgroundColor: YELLOW,
        borderTopLeftRadius: 1000,
        borderTopRightRadius: 1000,
    },
});

export default Footer;
export { Footer };
