import React, { useState, useEffect, Component } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import asyncToken from "../utils/token";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await asyncToken();
        if (token !== null) {
          fetch("http://localhost:4000/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              setAnimating(false);
              console.log(response);
              if (response.status == 200) {
                navigation.replace("DrawerNavigationRoutes");
              } else {
                navigation.replace("Auth");
              }
            })
            .catch((error) => {
              console.error(error);
              navigation.replace("Auth");
            });
        } else {
          navigation.replace("Auth");
        }
      } catch (error) {}
    };
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../Image/wunderapp.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#000000"
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
    backgroundColor: "#FFF1D0",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
