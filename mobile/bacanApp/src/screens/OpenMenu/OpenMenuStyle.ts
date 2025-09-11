import { StyleSheet } from 'react-native';
import { GREEN, ORANGE, WHITE, YELLOW } from '../../utils/myPalete';
import { FontFamilyName } from 'src/utils/GeneralStyle';

const OpenMenuStyle = StyleSheet.create({
    containerYellow: {
        backgroundColor: YELLOW,
    },
    textGreen: {
        color: GREEN,
        fontFamily: FontFamilyName
    },
});

export default OpenMenuStyle;