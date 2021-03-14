import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //aqui esta la imagen
      setImage(result.uri);
    }
  };

  const createFormData = (image, body) => {
    const data = new FormData();

    data.append("photo", {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", ""),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleUploadPhoto = () => {
    const data = image;
    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: createFormData(data, { userId: "123" }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("upload succes", response);
        alert("Upload success!");
        //this.setState({ image: null });
        setImage(null);
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button title="Upload" onPress={handleUploadPhoto} />
        </View>
      )}
    </View>
  );
}
