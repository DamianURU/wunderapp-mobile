import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Button, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import NoteCreator from "../Components/NoteCreator";
import asyncToken from "/Users/Damian/wunderapp/mobile/utils/token";

const HomeScreen = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState(false);

  const handleNoteButton = () => {
    setNewNote(!newNote);
    console.log(newNote);
  };

  useEffect(() => {
    const getNotes = async () => {
      try {
        const token = await asyncToken();
        //direccion de heroku /users/notes
        console.log("se esta ejecutando el fetch");
        fetch("http://localhost:4000/users/notes/getall", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            if (response.status == 200) {
              console.log(response);
              console.log(response.json);
              console.log(response.body);
              console.log(JSON.parse(response));
              console.log("paso algo ");
            } else {
              console.log("creme de la cum");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch {}
    };
    getNotes();
  }, []);

  if (newNote) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF1D0",
          justifyContent: "center",
        }}
      >
        <NoteCreator />
        <Button color="#086788" title="Done" onPress={handleNoteButton}>
          Done
        </Button>
      </View>
    );
  }

  // const form = ["First Name", "Last Name", "Phone", "Email", "Etc"];
  // const textInputComponents = form.map((type) => (
  //   <TextInput placeholder={type} />
  // ));

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF1D0", flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {notes && (
          <View>
            <Pressable>
              {" "}
              <Text>
                Aqui va un componente personalizado que debe cargar datos del
                array y debe ser presionable para editar las notas.
              </Text>
            </Pressable>
          </View>
        )}
        <Button
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          color="#07A0C3"
          title="Crear Nota"
          onPress={handleNoteButton}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
