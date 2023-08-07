import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../models/User";
import { useAppStateContext } from "./AppStateContext";
import AuthConnector from "../components/connectors/AuthConnector";

const AuthContext = createContext<
  | {
      userToken: string | undefined;
      setUserToken: Function;
      user: UserType | undefined;
      login: (email:string, password: string) => Promise<boolean>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {setIsLoading} = useAppStateContext();
  const [userToken, setUserToken] = useState<string>();
  const [user, setUser] = useState<UserType>(); 

  const getUserToken = async () => {
    try {
      setIsLoading(true);
      const token = await AuthConnector.getToken();

      if (token){
        const currUser = await AuthConnector.whoAmI(token);
        if(currUser){
          setUser(currUser);
          setUserToken(token);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserToken();
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const token = await AuthConnector.login(email, password).catch(() => null);
    setIsLoading(false);

    if (token) {
      setUserToken(token);
      setUser(await AuthConnector.whoAmI(token));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUserToken(undefined);
    AuthConnector.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user,
        setUserToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("App state context provider is not setup.");
  }
  return context;
};
