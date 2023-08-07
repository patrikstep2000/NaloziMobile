import { useEffect, useState } from "react";
import {
  AppStateProvider,
  useAppStateContext,
} from "./src/context/AppStateContext";
import { AuthContextProvider } from "./src/context/AuthContext";
import SplashScreen from "./src/screens/SplashScreen";
import AppStack from "./src/AppStack";

export default function App() {
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <AppStateProvider>
      <AuthContextProvider>
        <AppStack />
      </AuthContextProvider>
    </AppStateProvider>
  );
}
