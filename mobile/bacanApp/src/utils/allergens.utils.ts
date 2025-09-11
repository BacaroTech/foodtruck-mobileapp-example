import { ImageSourcePropType } from 'react-native';
import {
  IMAGEextrapiccante,
  IMAGEfruttaguscio,
  IMAGEglutine,
  IMAGElatticini,
  IMAGEpiccante,
  IMAGEsedano,
  IMAGEsenape,
  IMAGEsesamo,
  IMAGEsoia,
} from 'src/images';

export const allergensMapImage = new Map<string, ImageSourcePropType>([
    ['EXTRA_SPICE', IMAGEextrapiccante],
    ['GLUTEN', IMAGEglutine],
    ['DAIRY', IMAGElatticini],
    ['SPICE', IMAGEpiccante],
    ['CELERY', IMAGEsedano],
    ['MUSTARD', IMAGEsenape],
    ['SESAME', IMAGEsesamo],
    ['SOY', IMAGEsoia],
    ['FRUITS_IN_SHELL', IMAGEfruttaguscio],
]);
