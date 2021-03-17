import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const NoteCreator = () => {
  return (
    <SafeAreaView>
      <View style={styles.NoteName}>
        <TextInput placeholder="Title..." style={styles.TitleSize}></TextInput>
      </View>
      <View style={styles.NoteContent}>
        <TextInput
          placeholder="Write it off..."
          style={styles.NoteSize}
        ></TextInput>
      </View>
      <Button
        title="Agregar Nota"
        onPress={console.log(
          "funcion que haga fetch y meta la nota en la base de datos"
        )}
      ></Button>
    </SafeAreaView>
  );
};

export default NoteCreator;

const styles = StyleSheet.create({
  NoteName: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    margin: 5,
  },
  NoteContent: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    height: "80%",
    margin: 5,
    padding: 5,
  },
  NoteSize: {
    fontSize: 25,
  },
  TitleSize: {
    fontSize: 30,
  },
});
