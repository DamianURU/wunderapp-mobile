import AsyncStorage from "@react-native-community/async-storage";

const asyncToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      console.log(value);
      return value;
    } else return null;
  } catch (error) {
    console.log(error);
  }
};

export default asyncToken;
