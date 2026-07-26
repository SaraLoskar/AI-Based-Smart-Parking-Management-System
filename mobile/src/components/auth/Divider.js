import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Divider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <Text style={styles.text}>
        OR
      </Text>

      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },

  text: {
    marginHorizontal: 15,
    color: "#999",
    fontWeight: "600",
  },
});