import {
  createContext,
  useContext,
} from 'react';

import { AuthResponseDTO } from 'src/models/auth.interfaces';

// Context User
export type IUserContextData = {
  authData?: AuthResponseDTO | null;
  isAuthenticated: boolean;
}

export type IUserContext = {
  data: IUserContextData,
  auth: (authData: AuthResponseDTO | null) => void,
  isAuth: () => boolean,
  logout: () => void
};
export const initialUserData: IUserContextData = Object.freeze({
  authData: null,
  isAuthenticated: false,
});
export const UserContext = createContext<IUserContext>({
  data: initialUserData,
  auth: (_) => { },
  isAuth: () => false,
  logout: () => { },
});

export const useCurrentUser = () => {
  const currentUserContext = useContext(UserContext);

  if (!currentUserContext) {
    throw new Error(
      'UserContext has to be used within <UserContext.Provider>'
    );
  }

  return currentUserContext;
};

