import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //chequea por user id en el storage, si existe ID nos manda a DrawerNavigationRoutes, si no hay ID, nos manda a Auth
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "DrawerNavigationRoutes" : "Auth")
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../Image/aboutreact.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307ecc",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
