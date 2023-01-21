import { createContext, useReducer } from "react";
import { IChildrenComponent } from "../../../interfaces/common";
import { IAuthContextValue } from "../../../interfaces/contexts/auth";
import { TAuthReducer } from "../../../types/contexts/auth";
import createActions from "./actionCreator";
import initialState from "./initialState";
import authReducer from "./reducer";

export const AuthContext = createContext<IAuthContextValue | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: IChildrenComponent) => {
  const [state, dispatch] = useReducer<TAuthReducer>(authReducer, initialState);
  const actions = createActions(dispatch);

  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
};
