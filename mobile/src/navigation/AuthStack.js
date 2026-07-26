import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import GetStarted from "../screens/auth/GetStarted";
// import Login from "../screens/auth/Login";
// import Register from "../screens/auth/Register";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      {/* <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} /> */}
    </Stack.Navigator>
  );
}