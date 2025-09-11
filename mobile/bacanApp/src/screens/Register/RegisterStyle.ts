import { StyleSheet } from 'react-native';
import { FontFamilyName } from 'src/utils/GeneralStyle';
import {
  ORANGE,
  YELLOW,
} from 'src/utils/myPalete';

const RegisterStyle = StyleSheet.create({
    secondContainer: {
        backgroundColor: YELLOW,
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,
    },
    link: {
        marginTop: 10,
        color: ORANGE,
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: FontFamilyName,
    },
});

export default RegisterStyle;
