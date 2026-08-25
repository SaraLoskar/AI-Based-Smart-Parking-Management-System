import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ParkingDetails({
  route,
  navigation,
}) {
  const { parking = {} } = route.params || {};

  const distanceText =
    typeof parking.distance === "object"
      ? parking.distance?.formatted
      : (parking.distance || "Nearby");

  const durationText =
    typeof parking.estimatedDuration === "object"
      ? parking.estimatedDuration?.formatted
      : parking.estimatedDuration;

  const openGoogleMaps = () => {
    const url =
      parking.navigation?.googleMapsDirectionsUrl ||
      `https://www.google.com/maps/dir/?api=1&destination=${parking.latitude},${parking.longitude}&travelmode=driving`;
    Linking.openURL(url).catch((err) => console.log("Failed to open maps:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {parking.name || "Parking Location"}
      </Text>

      <Text style={styles.address}>
        {parking.address || "Address not provided"}
      </Text>

      {/* Proximity Badge */}
      <View style={styles.proximityBox}>
        <Ionicons name="navigate" size={20} color="#118A54" />
        <Text style={styles.proximityText}>
          {distanceText} {durationText ? `• ${durationText} drive` : ""}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Slots</Text>
          <Text style={styles.val}>{parking.totalSlots}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Available Slots</Text>
          <Text style={[styles.val, { color: "#118A54" }]}>{parking.availableSlots}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rate</Text>
          <Text style={styles.val}>₹{parking.pricePerHour}/hour</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Operating Hours</Text>
          <Text style={styles.val}>{parking.openingTime || "06:00"} - {parking.closingTime || "23:59"}</Text>
        </View>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={openGoogleMaps}
      >
        <Ionicons name="map-outline" size={22} color="#118A54" />
        <Text style={styles.navButtonText}>
          Open Directions in Google Maps
        </Text>
      </TouchableOpacity>

      {/* Book / Check Slots Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ParkingAvailability", {
            parking,
          })
        }
      >
        <Text style={styles.buttonText}>
          Check Slot Availability
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 15,
  },
  proximityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF9F1",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  proximityText: {
    color: "#118A54",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  label: {
    fontSize: 15,
    color: "#666",
  },
  val: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  navButton: {
    flexDirection: "row",
    backgroundColor: "#EAF9F1",
    height: 52,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#118A54",
    marginBottom: 12,
  },
  navButtonText: {
    color: "#118A54",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#118A54",
    height: 54,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 17,
  },
});