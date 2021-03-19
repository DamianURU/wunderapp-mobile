// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "./DrawerScreens/HomeScreen";
import que from "./DrawerScreens/que";
import CustomSidebarMenu from "./Components/CustomSidebarMenu";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#07A0C3",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const aypapa = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#07A0C3",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="que"
        component={que}
        options={{
          title: "buenas",
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#cee1f2",
        color: "#cee1f2",
        itemStyle: { marginVertical: 5, color: "white" },
        labelStyle: {
          color: "#000000",
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: "Home Screen" }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="Ay Papa"
        options={{ drawerLabel: "Machurrio" }}
        component={aypapa}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
