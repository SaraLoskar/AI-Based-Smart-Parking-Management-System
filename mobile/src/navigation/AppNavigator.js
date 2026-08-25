import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useAuth } from "../context/AuthContext";

export default function AppNavigator() {

  const { user } = useAuth();

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );

}