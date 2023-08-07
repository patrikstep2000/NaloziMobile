import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ModalType } from "../models/Modal";

const AppStateContext = createContext<
  | {
      isLoading: boolean;
      setIsLoading: Function;
      modal: ModalType | undefined;
      setModal: Function;
    }
  | undefined
>(undefined);


export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalType>()

  return (
    <AppStateContext.Provider
      value={{
        isLoading,
        setIsLoading,
        modal,
        setModal
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("App state context provider is not setup.");
  }
  return context;
};
