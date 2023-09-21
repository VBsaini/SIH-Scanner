import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@react-native-material/core";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Image
        style={styles.logo}
        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80"
      />
      <View style={styles.innerContainer}>
        <Text style={{ color: "#fff" }}>
          Open up App.js yello asdto start working on your app!
        </Text>
        <View style={{ marginHorizontal: 40, marginTop: 20, height: 36 }}>
          <Button
            style={{
              backgroundColor: "#327a14",
              flex: 1,
            }}
            titleStyle={{
              fontSize: 20,
              alignSelf: "center",
            }}
            size="Large"
            title="Scan"
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
            title="How to Scan"
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
    width: windowWidth + 20,
    height: windowHeight + 50,
    left: -40,
    top: -10,
    zIndex: 5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
