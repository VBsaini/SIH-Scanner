import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@react-native-material/core";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const customFonts = {
  DancingScript: require("../../assets/fonts/DancingScript-Bold.ttf"),
};

export default function Home() {
  const [image, setImage] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  useEffect(() => {
    (async () => {
      await loadAsync(customFonts);
      setFontsLoaded(true);
    })();
  }, []);
  if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View>
        <Text>Permission Denied</Text>
        <Button onPress={requestPermission} title="Request Permission" />
      </View>
    );
  }
  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        console.log(uri);
        setImage(uri);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [16, 9],
      cameraType: "back",
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Image
        style={styles.logo}
        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80"
      />
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Zephire</Text>
        <Text style={styles.text}>
          Click the scan button below to scan your image
        </Text>
        <View style={{ marginHorizontal: 40, marginTop: 20, height: 36 }}>
          <Button
            style={{
              backgroundColor: "#327a14",
              flex: 1,
            }}
            onPress={pickImage}
            titleStyle={{
              fontSize: 20,
              alignSelf: "center",
            }}
            size="Large"
            title="Scan"
            leading={(props) => (
              <Icon name="scan-helper" style={{ marginRight: 5 }} {...props} />
            )}
          />
        </View>
        <View style={{ marginHorizontal: 40, marginTop: 20 }}>
          <Button
            color="#327a14"
            titleStyle={{
              fontSize: 20,
              alignSelf: "center",
            }}
            size="large"
            onPress={takePhoto}
            title="How to Scan"
            leading={(props) => (
              <Icon name="information" style={{ marginRight: 5 }} {...props} />
            )}
          />
        </View>
      </View>
      <StatusBar style={{ backgroundColor: "#327a14" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: 50,
    height: 50,
  },
  innerContainer: {
    zIndex: 10,
  },
  logo: {
    position: "absolute",
    width: windowWidth + 20,
    height: windowHeight + 50,
    top: -10,
  },
  overlay: {
    position: "absolute",
    width: windowWidth + 50,
    height: windowHeight + 50,
    left: -40,
    top: -10,
    zIndex: 9,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  heading: {
    color: "gold",
    fontSize: 80,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "DancingScript",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
