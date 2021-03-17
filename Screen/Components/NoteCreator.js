import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Loader from "./Loader";
import AsyncStorage from "@react-native-community/async-storage";

const NoteCreator = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNote = () => {
    if (!noteTitle) {
      alert("Please title it off.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setAnimating(false);
      //chequea por user id en el storage, si existe ID nos manda a DrawerNavigationRoutes, si no hay ID, nos manda a Auth
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "Auth" : "DrawerNavigationRoutes")
      );
    }, 3000);
    let user_id = AsyncStorage.getItem("user_id");
    let dataToSend = {
      noteTitle: noteTitle,
      noteContent: noteContent,
      user_id: user_id,
    };
    console.log("enviando nota");
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //https://wunder-backend-movil-app.herokuapp.com/createnote
    fetch("http://192.168.1.108:4000/createnote", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status == 200) {
          console.log("algo tiene que decir que salio bien");
        } else {
          console.log("algo tiene que decir que salio mal");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <Loader loading={loading} />
      <View style={styles.NoteName}>
        <TextInput
          placeholder="Title..."
          style={styles.TitleSize}
          onChangeText={(text) => setNoteTitle(text)}
          value={noteTitle}
        ></TextInput>
      </View>
      <View style={styles.NoteContent}>
        <TextInput
          placeholder="Write it off..."
          style={styles.NoteSize}
          multiline
          onChangeText={(text) => setNoteContent(text)}
          value={noteContent}
        ></TextInput>
      </View>
      <Button title="Agregar Nota" onPress={handleNote}></Button>
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
