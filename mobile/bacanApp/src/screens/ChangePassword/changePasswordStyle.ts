import { StyleSheet } from 'react-native';

import {
  ORANGE,
  YELLOW,
} from '../../utils/myPalete';

const ChangePasswordStyle = StyleSheet.create({
    secondContainer: {
        backgroundColor: YELLOW,
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,
    },
    submit: {
        backgroundColor: ORANGE,
        color: YELLOW,
        height: 40,
        borderRadius: 15,
        borderWidth: 0,
        fontSize: 20,
        marginTop: 20,
    },
});

export default ChangePasswordStyle;
