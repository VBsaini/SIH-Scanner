import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import mime from "mime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@react-native-material/core";
import * as Clipboard from "expo-clipboard"
import Toast from "react-native-root-toast";

notify = (message) => {
  let toast = Toast.show('Text Copied', {
    duration: Toast.durations.SHORT,
  });
  // if (Platform.OS != 'android') {
  //     // Snackbar.show({
  //     //     text: message,
  //     //     duration: Snackbar.LENGTH_SHORT,
  //     // });
  // } else {
  //     ToastAndroid.show(message, ToastAndroid.SHORT);
  // }
}
const Plant = (props) => {
  const { route, navigation } = props;
  const { image } = route.params;
  const uri = image.uri;

  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory, getHistory] = useState([]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("historyData");
      if (value !== null) {
        setHistory(JSON.parse(value));
        console.log("value", history);
        return JSON.parse(value);
      }
      return [];
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };
  // setvalue((state) => {
  //   return state;
  // });
  const storeData = async (value) => {
    try {
      let his = await getData();
      let hisD = [...his];
      hisD.length >= 3?  his.length = 3 : null;
      setHistory(hisD);
      let data = [value, ...his];
      data.length >= 3?  data.length = 3 : null;
      console.log("history ====== ", data);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("historyData", jsonValue);
    } catch (e) {
      console.log("history e", e);
      // saving error
    }
  };
  const clearAsyncStorage = async () => {
    setHistory([]);
    AsyncStorage.clear();
  };
  useEffect(() => {
    // clearAsyncStorage();
    getData();
    const body = new FormData();
    body.append("image", {
      uri: uri,
      type: mime.getType(uri),
      name: uri.split("/").pop(),
    });

    setLoading(true);
    const base_url = process.env.EXPO_PUBLIC_API_ENDPOINT;
    const url = `https://sih-server.onrender.com/api/prediction`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body,
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (!data?.data || data?.errors) {
          throw new Error(JSON.stringify(data?.errors));
        }
        // console.log(data?.data);
        storeData(data?.data);
        setPrediction(data?.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Loading...</Text>
      </View>
    );
  }
  if (error || !prediction) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Something went wrong please try again later 🥲
        </Text>
        <Button
          color="#327a14"
          style={{ marginTop: 20 }}
          titleStyle={{
            fontSize: 15,
            alignSelf: "center",
          }}
          size="large"
          onPress={() => navigation.navigate("Home")}
          title="Go back"
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        Plant Name:{" "}
        <Text style={{ fontWeight: "500", color: "#327a14" }}>
          {prediction.name}
        </Text>
      </Text>
      <Image style={styles.image} source={{ uri }} />
      <View style={{ margin: 20 }}>
        <Button color="secondary" title="Copy Name" titleStyle={{color:"black", marginHorizontal: 20}} onPress={() => {
          Clipboard.setStringAsync(prediction.name);
           notify("Name Copied");``}} />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Properties of plant
        </Text>
        {prediction.uses.length > 0 ? (
          prediction.uses.map((use, index) => (
            <Text style={{ fontSize: 15, marginVertical: 5 }} key={index}>
              {index + 1}.) {use}
            </Text>
          ))
        ) : (
          <Text>Comming soon</Text>
        )}
        {history.length != 0 && (
          <View style={{ backgroundColor: "#327a14", padding: 10 }}>
            {history.map((item, index) => (
              <Text style={{ color: "white" }} key={index}>
                {item.name}
              </Text>
            ))}
            <Button color="error" title="Clear History" onPress={clearAsyncStorage} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: 224,
    height: 224,
    marginVertical: 20,
  },
  error: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "red",
    marginHorizontal: 30,
  },
});

export default Plant;
