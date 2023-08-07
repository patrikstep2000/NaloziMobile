import React from "react";
import NavigationDrawer from "./components/containers/ui/NavigationDrawer";
import { useAppStateContext } from "./context/AppStateContext";
import { useAuthContext } from "./context/AuthContext";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";

const AppStack = () => {
  const { userToken } = useAuthContext();
  const { isLoading,  modal } = useAppStateContext();

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : userToken ? (
        modal?.isVisible ? (
          modal.component
        ) : (
          <NavigationDrawer />
        )
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default AppStack;
