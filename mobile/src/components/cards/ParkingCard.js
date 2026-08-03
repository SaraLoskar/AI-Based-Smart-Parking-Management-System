import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

export default function ParkingCard({
  parking,
  onPress,
}) {

  const occupancy =
    Math.round(
      ((parking.totalSlots - parking.availableSlots) /
        parking.totalSlots) *
      100
    );

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress?.(parking)}
    >

      {/* Top */}

      <View style={styles.topRow}>

        <View style={styles.left}>

          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name="parking"
              size={28}
              color="#118A54"
            />
          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.name}>
              {parking.name}
            </Text>

            <Text style={styles.address}>
              {parking.address}
            </Text>

          </View>

        </View>

        <View
          style={[
            styles.status,
            {
              backgroundColor:
                parking.availableSlots > 0
                  ? "#EAF9F1"
                  : "#FFECEC",
            },
          ]}
        >

          <Text
            style={{
              color:
                parking.availableSlots > 0
                  ? "#118A54"
                  : "#E53935",
              fontWeight: "700",
            }}
          >
            {parking.availableSlots > 0
              ? "Open"
              : "Full"}
          </Text>

        </View>

      </View>

      {/* Middle */}

      <View style={styles.middleRow}>

        <View style={styles.info}>

          <Ionicons
            name="location-outline"
            size={16}
            color="#888"
          />

          <Text style={styles.infoText}>
            {parking.distance || "0.4 km"}
          </Text>

        </View>

        <View style={styles.info}>

          <Ionicons
            name="cash-outline"
            size={16}
            color="#888"
          />

          <Text style={styles.infoText}>
            ₹{parking.pricePerHour}/hr
          </Text>

        </View>

      </View>

      {/* Bottom */}

      <View style={styles.bottomRow}>

        <View>

          <Text style={styles.slotText}>
            {parking.availableSlots} / {parking.totalSlots}
          </Text>

          <Text style={styles.available}>
            Available Slots
          </Text>

        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => onPress?.(parking)}
        >
          <Text style={styles.bookText}>
            Book Now
          </Text>
        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F2FAF6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  address: {
    marginTop: 4,
    color: "#777",
    fontSize: 13,
  },

  status: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  middleRow: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "space-between",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 13,
  },

  bottomRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  slotText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#118A54",
  },

  available: {
    color: "#777",
    marginTop: 2,
  },

  bookBtn: {
    backgroundColor: "#118A54",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
  },

  bookText: {
    color: "#fff",
    fontWeight: "700",
  },

});