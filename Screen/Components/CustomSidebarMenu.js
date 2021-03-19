// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import logo from "../Components/icon.png";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import AsyncStorage from "@react-native-community/async-storage";

const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Image style={stylesSidebar.profileHeaderPicCircle} source={logo} />
          <Text style={{ fontSize: 25, color: "#F0C808" }}></Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>Wunder Note</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({ color }) => (
            <Text style={{ color: "#000000" }}>Logout</Text>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              "Logout",
              "Are you sure? You want to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    AsyncStorage.removeItem("token");
                    props.navigation.replace("Auth");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#086788",
    paddingTop: 40,
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#FFF1D0",
    padding: 15,
    textAlign: "center",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "black",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});
