import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function StatsCard({
  totalParking,
  totalAvailable,
}) {

  const occupied = totalParking - totalAvailable;

  return (

    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>Total</Text>
        <Text style={styles.number}>
          {totalParking}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Available</Text>
        <Text
          style={[
            styles.number,
            { color: "#1A9E55" },
          ]}
        >
          {totalAvailable}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Occupied</Text>
        <Text
          style={[
            styles.number,
            { color: "#E53935" },
          ]}
        >
          {occupied}
        </Text>
      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 22,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    marginHorizontal: 4,

    borderRadius: 18,

    paddingVertical: 18,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  title: {
    color: "#777",
    fontSize: 14,
  },

  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
  },

});