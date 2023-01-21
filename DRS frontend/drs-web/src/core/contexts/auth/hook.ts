import { useContext } from "react";
import { IAuthContextValue } from "../../../interfaces/contexts/auth";
import { AuthContext } from "./provider";

export const useAuthContext = (): IAuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
