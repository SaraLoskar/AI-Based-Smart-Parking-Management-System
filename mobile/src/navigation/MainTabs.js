import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/home/HomeScreen";

// Temporary Dummy Screens
import { View, Text } from "react-native";

const Dummy = ({ title }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FAFBF8",
    }}
  >
    <Text style={{ fontSize: 22 }}>{title}</Text>
  </View>
);

const ReservationScreen = () => <Dummy title="Reservations" />;
const ParkingScreen = () => <Dummy title="Parking" />;
const HistoryScreen = () => <Dummy title="History" />;
const ProfileScreen = () => <Dummy title="Profile" />;

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#118A54",
        tabBarInactiveTintColor: "#777",

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let icon;

          switch (route.name) {
            case "Home":
              icon = "home";
              break;
            case "Reservations":
              icon = "calendar";
              break;
            case "Parking":
              icon = "car";
              break;
            case "History":
              icon = "time";
              break;
            case "Profile":
              icon = "person";
              break;
          }

          return (
            <Ionicons
              name={icon}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Reservations"
        component={ReservationScreen}
      />

      <Tab.Screen
        name="Parking"
        component={ParkingScreen}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}