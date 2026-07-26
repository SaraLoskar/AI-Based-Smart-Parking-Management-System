import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const ParkingCard = ({
  name,
  distance,
  availableSlots,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Ionicons
          name="car-sport"
          size={24}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.center}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.distance}>
          {distance}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.available}>
          {availableSlots}
        </Text>

        <Text style={styles.label}>
          Available
        </Text>
      </View>
    </View>
  );
};

export default ParkingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  left: {
    marginRight: 15,
  },

  center: {
    flex: 1,
  },

  name: {
    fontWeight: "700",
    fontSize: 17,
    color: COLORS.text,
  },

  distance: {
    marginTop: 4,
    color: COLORS.textLight,
    fontSize: 14,
  },

  right: {
    alignItems: "center",
  },

  available: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },

  label: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});