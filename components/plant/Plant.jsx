const { View, Text } = require("react-native");

const Plant = (props) => {
  const { route } = props;
  const { imageUri } = route.params;
  console.log(imageUri);
  return (
    <View>
      <Text>Plants</Text>
    </View>
  );
};

export default Plant;
