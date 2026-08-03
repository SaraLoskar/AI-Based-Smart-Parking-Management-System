import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/auth/SplashScreen";
import GetStarted from "../screens/auth/GetStarted";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";
import OTPVerification from "../screens/auth/OTPVerification";
import ResetPassword from "../screens/auth/ResetPassword";

import MainTabs from "./MainTabs";

import ParkingDetails from "../screens/parking/ParkingDetails";
import ParkingAvailability from "../screens/parking/ParkingAvailability";
import SlotReservation from "../screens/parking/SlotReservation";
import PaymentScreen from "../screens/payment/PaymentScreen";

import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AuthStack() {

  const { user } = useAuth();

  return (

    <Stack.Navigator screenOptions={{ headerShown: false, }} >

      {!user ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="ParkingDetails" component={ParkingDetails} />
          <Stack.Screen name="ParkingAvailability" component={ParkingAvailability} />
          <Stack.Screen name="SlotReservation" component={SlotReservation} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </>
      )}

    </Stack.Navigator>

  );
}