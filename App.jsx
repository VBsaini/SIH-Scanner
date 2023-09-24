import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from 'react-native-root-siblings';
// Screens
import { Home, Plant } from "./screens";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <RootSiblingParent>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Plant" component={Plant} />
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
  );
}

export default App;
