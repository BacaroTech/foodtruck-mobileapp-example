import { StyleSheet } from 'react-native';
import { FontFamilyName } from 'src/utils/GeneralStyle';
import {
  ORANGE,
  ORANGE_TXT_OVER_YELLOW,
  YELLOW,
} from 'src/utils/myPalete';

const LoginStyle = StyleSheet.create({
    secondContainer: {
        backgroundColor: YELLOW,
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,
    },
    link: {
        color: ORANGE,
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 20,
        fontFamily: FontFamilyName,
    },
    account: {
        marginTop: 10,
        color: ORANGE_TXT_OVER_YELLOW,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: FontFamilyName,
    }
});

export default LoginStyle;
