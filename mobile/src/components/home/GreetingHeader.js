import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function GreetingHeader() {

  const { user } = useAuth();

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    if (hour < 21) return "Good Evening";

    return "Good Night";
  };

  const firstName =
    user?.name?.trim()?.split(" ")[0] || "Guest";

  return (
    <View style={styles.container}>

      <View>

        <Text style={styles.greeting}>
          {getGreeting()} 👋
        </Text>

        <Text style={styles.name}>
          {firstName}
        </Text>

      </View>

      <View style={styles.rightSection}>

        <TouchableOpacity style={styles.bellButton}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#222"
          />
        </TouchableOpacity>

        <TouchableOpacity>

          {user?.profileImage ? (

            <Image
              source={{ uri: user.profileImage }}
              style={styles.avatar}
            />

          ) : (

            <View style={styles.avatarPlaceholder}>
              <Text style={styles.initial}>
                {firstName.charAt(0).toUpperCase()}
              </Text>
            </View>

          )}

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 15,
    marginBottom: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 17,
    color: "#666",
  },

  name: {
    fontSize: 33,
    fontWeight: "700",
    color: "#222",
    marginTop: 5,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  bellButton: {
    marginRight: 15,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#118A54",

    justifyContent: "center",
    alignItems: "center",
  },

  initial: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

});