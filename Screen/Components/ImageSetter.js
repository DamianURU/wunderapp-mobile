import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
      quality: 1,
    });

    if (!result.cancelled) {
      //aqui esta la imagen
      setImage(result);
    }

    console.log(result);
  };

  const createFormData = (image) => {
    const data = new FormData();

    data.append("image", {
      uri:
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", ""),
      type: "image/jpeg",
    });

    console.log(data.body);

    return data;
  };

  const handleUploadPhoto = () => {
    const data = image;
    fetch("https://wunder-backend-movil-app.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: createFormData(data),
    })
      .then((response) => response.text())
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
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <View>
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
            <Button title="Upload" onPress={handleUploadPhoto} />
          </View>
        )}
      </View>
    </View>
  );
}
