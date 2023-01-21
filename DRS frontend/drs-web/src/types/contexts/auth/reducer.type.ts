import {
  IAuthContextAction,
  IAuthContextState,
} from "../../../interfaces/contexts/auth";

export type TAuthReducer = (
  state: IAuthContextState,
  action: IAuthContextAction
) => IAuthContextState;
