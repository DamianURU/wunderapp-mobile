import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";

const que = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 300, height: 200 }}
            source={{
              uri: "https://i.makeagif.com/media/4-07-2017/UfVuQX.gif",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default que;
