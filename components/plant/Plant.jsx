import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import mime from "mime";
import { Button } from "@react-native-material/core";

const fetcher = async (uri) => {
  if (!res.ok) throw new Error("Something went wrong");
  const prediction = await res.json();

  return prediction;
};

const Plant = (props) => {
  const { route, navigation } = props;
  const { image } = route.params;
  const uri = image.uri;

  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const body = new FormData();
    body.append("image", {
      uri: uri,
      type: mime.getType(uri),
      name: uri.split("/").pop(),
    });

    setLoading(true);
    const res = fetch("http://192.168.0.101:5000/api/prediction", {
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
        setPrediction(data.data);
      })
      .catch(() => {
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

  if (error) {
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
          {prediction}
        </Text>
      </Text>
      <Image style={styles.image} source={{ uri }} />
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
    width: 1600 / 7,
    height: 1200 / 7,
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
