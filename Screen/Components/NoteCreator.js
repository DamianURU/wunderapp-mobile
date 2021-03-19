import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Loader from "./Loader";
import asyncToken from "/Users/Damian/wunderapp/mobile/utils/token";

const NoteCreator = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Error! :(",
      "Error al enviar nota...",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

  const handleNote = async () => {
    try {
      const token = await asyncToken();
      if (!noteTitle) {
        alert("Please title it off.");
        return;
      }

      setLoading(true);
      let dataToSend = {
        notetitle: noteTitle,
        notetext: noteContent,
        notedate: "2021-01-01",
        notetimeleft: "2021-01-01",
        notecheck: false,
        notepriority: false,
      };
      console.log("enviando nota");
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log(token);
      //https://wunder-backend-movil-app.herokuapp.com/createnote
      fetch("http://localhost:4000/users/notes/create", {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.status == 200) {
            console.log("algo tiene que decir que salio bien");
          } else {
            createTwoButtonAlert();
            console.log("algo tiene que decir que salio mal");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } catch (error) {}
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
      <Button
        title="Agregar Nota"
        onPress={handleNote}
        color="#07A0C3"
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
