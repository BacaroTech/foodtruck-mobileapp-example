import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import { storage } from 'src/config/storage';
import {
  initialUserData,
  IUserContextData,
  StoreContext,
  UserContext,
} from 'src/context';
import { BacaInitLoader } from 'src/core';
import { IChildrenReactNode } from 'src/models';
import { AuthResponseDTO } from 'src/models/auth.interfaces';
import { isExpired } from 'src/utils';

const _isAuth = (authResp: AuthResponseDTO | null | undefined) => {
    if (!authResp) {
        return false;
    }

    if (isExpired(authResp)) {
        return false;
    }
    return true;
};

const BacaCore = ({ children }: IChildrenReactNode) => {
    const [storeContextData] = useState({
        storage: storage,
    });
    const [userContextData, setUserContextData] = useState<IUserContextData>(initialUserData);

    const auth = useCallback((newAuthResponse: AuthResponseDTO | null) => {

        const _isAuthenticated = _isAuth(newAuthResponse);
        setUserContextData((prevUserContextData) => ({
            ...prevUserContextData,
            authData: newAuthResponse,
            isAuthenticated: _isAuthenticated,
        }));
    }, []);

    const isAuth = useCallback(() => {
        return _isAuth(userContextData.authData);
    }, [userContextData.authData]);

    const logout = useCallback(() => {
        setUserContextData((prevUserContextData) => ({
            ...prevUserContextData,
            authData: null,
        }));
    },[]);

    const contextValue = useMemo(() => {
        const _cValue = {
            data: { ...userContextData },
            auth,
            isAuth,
            logout,
        };
        return _cValue;
    }, [userContextData, auth, isAuth, logout]);

    return (
        <StoreContext.Provider value={storeContextData}>
            <UserContext.Provider value={contextValue}>
                <BacaInitLoader>
                    {children}
                </BacaInitLoader>
            </UserContext.Provider>
        </StoreContext.Provider>
    );
};

export { BacaCore };
