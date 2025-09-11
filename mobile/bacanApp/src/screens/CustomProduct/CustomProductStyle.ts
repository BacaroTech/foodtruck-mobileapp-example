import { StyleSheet } from 'react-native';
import { FontFamilyName } from 'src/utils/GeneralStyle';
import {
  BLACK,
  WHITE,
} from 'src/utils/myPalete';

const CustomProductStyle = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        color: WHITE,
        margin: 8,
        fontFamily: FontFamilyName,
    },
    textArea: {
        backgroundColor: WHITE,
        color: BLACK,
        padding: 5,
        fontFamily: FontFamilyName,
    },
});

export default CustomProductStyle;
