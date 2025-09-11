import { ImageSourcePropType } from 'react-native';
import {
  IMAGEbibite,
  IMAGEburritos,
  IMAGEdessert,
  IMAGEerrore,
  IMAGEfritti,
  IMAGEnach,
  IMAGEpanini,
  IMAGEpiat,
  IMAGEtaco,
} from 'src/images';
import { CategoryDTO } from 'src/models';

const mapImage: Map<string, any> = new Map<string, ImageSourcePropType>([
    ['DRINKS', IMAGEbibite],
    ['BURRITOS', IMAGEburritos],
    ['TACOS', IMAGEtaco],
    ['PANINI', IMAGEpanini],
    ['PIATTI_TIPICI', IMAGEpiat],
    ['NACHOS', IMAGEnach],
    ['FRITTI', IMAGEfritti],
    ['DESSERTS', IMAGEdessert],
]);

export function mapImg(truckCalendar: CategoryDTO): any {
    const find = mapImage.get(truckCalendar.code);
    return find ? find : IMAGEerrore;
}
const categoryListShowDescription: string[] = [

    'BURRITOS',
    'TACOS',
    'PANINI',
    'PIATTI_TIPICI',
    'NACHOS',
    'FRITTI',

];
export function isCategoryDescriptionShowing(category: string | undefined): boolean {
    return categoryListShowDescription.find(c => category && c.toLocaleLowerCase() === category.toLocaleLowerCase()) !== undefined;
}
