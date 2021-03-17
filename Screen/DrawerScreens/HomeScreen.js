import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Button, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import NoteCreator from "../Components/NoteCreator";

const HomeScreen = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState(false);

  const handleNoteButton = () => {
    setNewNote(!newNote);
    console.log(newNote);
  };

  useEffect(() => {
    (async () => {
      console.log(
        "buscar todas las notas y cargarlas en el state en un array, si no hay, dejarlo asi"
      );
    })();
  }, []);

  if (newNote) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#307ecc",
          justifyContent: "center",
        }}
      >
        <NoteCreator />
        <Button title="Done" onPress={handleNoteButton}>
          Done
        </Button>
      </View>
    );
  }

  const form = ["First Name", "Last Name", "Phone", "Email", "Etc"];
  const textInputComponents = form.map((type) => (
    <TextInput placeholder={type} />
  ));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <>{textInputComponents}</>
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
        <Button title="Crear Nota" onPress={handleNoteButton}></Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
