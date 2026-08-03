import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
}) {
  return (
    <View style={styles.container}>

      <Ionicons
        name="search"
        size={22}
        color="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Search parking..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity
        onPress={onFilterPress}
      >
        <MaterialIcons
          name="tune"
          size={24}
          color="#118A54"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 56,
    backgroundColor: "#fff",

    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    color: "#222",
  },

});