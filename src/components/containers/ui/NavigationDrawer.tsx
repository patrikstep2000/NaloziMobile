import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useAuthContext } from "../../../context/AuthContext";
import HomeScreen from "../../../screens/HomeScreen";

const Drawer = createDrawerNavigator();

const NavigationDrawer: FC<{}> = () => {
  const {logout} = useAuthContext();
  return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent props={props} onLogout={logout}/>
          )}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
};

const CustomDrawerContent: FC<{
  props: DrawerContentComponentProps;
  onLogout: () => void;
}> = ({ props, onLogout }) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainer}
    >
      <DrawerItemList {...props} />
      <View style={styles.itemContainer}>
        <DrawerItem
          style={styles.item}
          label="Logout"
          onPress={() => onLogout()}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 30,
  },
  item: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default NavigationDrawer;
