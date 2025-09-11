import { StyleSheet } from 'react-native';
import { FontFamilyName } from 'src/utils/GeneralStyle';
import { WHITE } from 'src/utils/myPalete';

const HomeStyle = StyleSheet.create({
    category: {
        zIndex: 100,
        color: WHITE,
        fontSize: 50,
        fontFamily: FontFamilyName,
    },
    innerFrame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },
});

export default HomeStyle;
