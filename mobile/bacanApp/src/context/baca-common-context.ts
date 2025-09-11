import {
  createContext,
  useContext,
} from 'react';

import {
  CategoryView,
  ExtrasView,
  WhereWeekView,
} from 'src/models';
import { TruckDayDTO } from 'src/models/where.interfaces';

export type ICommonDataContext = {
    todayPlaces: TruckDayDTO[];
    weekPlaces: TruckDayDTO[]
    categories: CategoryView[],
    whereWeekView: WhereWeekView[],
    extras: ExtrasView[],
    loading: boolean,
}

export const initialCommonData: ICommonDataContext = Object.freeze({
    todayPlaces: [],
    weekPlaces: [],
    categories: [],
    whereWeekView: [],
    extras: [],
    loading: false,
});

export const CommonDataContext = createContext<ICommonDataContext>({
    ...initialCommonData,
});

export const useCommonData = () => {
    const _context = useContext(CommonDataContext);
    if (!_context) {
        throw new Error(
            'CommonDataContext has to be used within <CommonDataContext.Provider>'
        );
    }

    return _context;
};


export type ICommonActionContext = {
    fetchData: () => void,
};

export const CommonActionContext = createContext<ICommonActionContext>({
    fetchData: () => { },
});

export const useActionOrder = () => {
    const _context = useContext(CommonActionContext);

    if (!_context) {
        throw new Error(
            'CommonActionContext has to be used within <CommonActionContext.Provider>'
        );
    }

    return _context;
};
