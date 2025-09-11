import { StyleSheet } from 'react-native';

import {
  BLACK,
  GREEN,
  ORANGE,
  ORANGE_TXT_OVER_GREEN,
  ORANGE_TXT_OVER_YELLOW,
  WHITE,
  YELLOW,
} from './myPalete';

export const FontFamilyName = 'IrishGrover-Regular';

const GeneralStyle = StyleSheet.create({
    container: {
        backgroundColor: GREEN,
    },
    title: {
        color: ORANGE_TXT_OVER_GREEN,
        fontFamily: FontFamilyName,
    },
    titleStatus: {
        color: ORANGE_TXT_OVER_YELLOW,
        fontFamily: FontFamilyName,
    },
    titleYellow: {
        color: YELLOW,
        fontFamily: FontFamilyName,
    },
    textPrice: {
        color: WHITE,
        fontSize: 35,
        fontFamily: FontFamilyName,
    },
    text: {
        color: WHITE,
        fontSize: 25,
        fontFamily: FontFamilyName,
    },
    textPlus: {
        color: WHITE,
        fontSize: 50,
        fontFamily: FontFamilyName,
    },
    textOrangeOverGreen: {
        color: ORANGE_TXT_OVER_GREEN,
    },
    textOrange: {
        color: ORANGE,
        fontFamily: FontFamilyName,
    },
    yellow: {
        fontSize: 30,
        color: YELLOW,
        fontFamily: FontFamilyName,
    },
    textButtonYellowBG: {
        fontSize: 30,
        color: ORANGE_TXT_OVER_GREEN,
        fontFamily: FontFamilyName,
    },
    black: {
        color: BLACK,
        fontFamily: FontFamilyName,
    },
    input: {
        height: 48,
        marginTop: 20,
        borderRadius: 15,
        padding: 5,
        fontSize: 25,
        paddingLeft: 20,
        color: WHITE,
        backgroundColor: GREEN,
        fontFamily: FontFamilyName,
    },
    submitTrasparent: {
        borderColor: WHITE,
        borderWidth: 1,
        color: ORANGE,
        margin: 10,
        height: 40,
        borderRadius: 15,
        fontSize: 20,
    },
    submit: {
        backgroundColor: YELLOW,
        color: ORANGE,
        height: 50,
        borderRadius: 15,
        fontSize: 20,
    },
    fontSubmit: {
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 35,
    },
    submitOrange: {
        backgroundColor: ORANGE,
        color: YELLOW,
        height: 50,
        borderRadius: 15,
        fontFamily: FontFamilyName,
    },
    submitYellow: {
        backgroundColor: YELLOW,
    },
    submitGreen: {
        backgroundColor: GREEN,
    },
    privacy: {
        marginTop: 20,
        color: ORANGE_TXT_OVER_YELLOW,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: FontFamilyName,
    },
    loginContainerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'GREEN',
    },
    containerPassword: {
        backgroundColor: GREEN,
        borderRadius: 15,
        marginTop: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    inputPassword: {
        color: WHITE,
        fontFamily: FontFamilyName,
        fontSize: 25,
    },
    passwordShow: {
        color: WHITE,
    },
});

export default GeneralStyle;
export { GeneralStyle };
