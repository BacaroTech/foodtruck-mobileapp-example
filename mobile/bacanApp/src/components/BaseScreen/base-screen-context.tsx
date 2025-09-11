import {
  createContext,
  useContext,
} from 'react';

import { ErrorState } from 'src/models';

export type IBaseScreen = {
    error: ErrorState | null;
}
export type IBaseScreenContext = {
    data: IBaseScreen,
    setData: (data: IBaseScreen) => void,
    setError: (error: ErrorState) => void,

}
export const initialBaseScreenData: IBaseScreen = Object.freeze({

    error: null,
    cartOrderSaved: { ordersItems: [] },
    orderItemsView: [],
    totalPrice: 0,
});

const BaseScreenContext = createContext<IBaseScreenContext>({
    data: initialBaseScreenData,
    setData: () => { },
    setError: () => { },
});

export const useBaseScreen = () => {
    const _currentContext = useContext(BaseScreenContext);

    if (!_currentContext) {
        throw new Error(
            'BaseScreenContext has to be used within <BaseScreenContext.Provider>'
        );
    }
    return _currentContext;
};

export { BaseScreenContext };
