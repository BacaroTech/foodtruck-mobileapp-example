import {
  createContext,
  useContext,
} from 'react';

import Storage from 'react-native-storage';
import { storage } from 'src/config/storage';

export type IStoreContext = {
    storage: Storage
};

export const StoreContext = createContext<IStoreContext>({
    storage: storage,
});
export const useCurrentStore = () => {
    const _currentContext = useContext(StoreContext);

    if (!_currentContext) {
        throw new Error(
            'StoreContext has to be used within <CurrentUserContext.Provider>'
        );
    }

    return _currentContext;
};
