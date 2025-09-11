import {
  IMAGEpiat,
  IMAGEtaco,
} from 'src/images';
import { CategoryView } from 'src/models';

export const categoriesMock: CategoryView[] = [
    {
        code: 'TACOS',
        name: 'Tacos',
        img: IMAGEtaco,
    },
    {
        code: 'PIATTI_TIPICI',
        name: 'Piatti unici',
        img: IMAGEpiat,
    },
];
