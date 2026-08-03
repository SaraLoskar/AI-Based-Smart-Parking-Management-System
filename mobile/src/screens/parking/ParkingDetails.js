import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ParkingDetails({
  route,
  navigation,
}) {

  const { parking } = route.params;

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {parking.name}
      </Text>

      <Text style={styles.address}>
        {parking.address}
      </Text>

      <Text style={styles.text}>
        Total Slots : {parking.totalSlots}
      </Text>

      <Text style={styles.text}>
        Available : {parking.availableSlots}
      </Text>

      <Text style={styles.text}>
        ₹{parking.pricePerHour}/hour
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ParkingAvailability", {
            parking,
          })
        }
      >
        <Text style={styles.buttonText}>
          Check Availability
        </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FAFBF8",
    padding: 25,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  address: {
    marginTop: 8,
    color: "#666",
    fontSize: 16,
    marginBottom: 25,
  },

  text: {
    fontSize: 18,
    marginBottom: 15,
    color: "#444",
  },

  button: {
    marginTop: 35,
    backgroundColor: "#118A54",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
  },

});