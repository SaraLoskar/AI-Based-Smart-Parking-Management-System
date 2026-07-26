import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import COLORS from "../../constants/colors";

const StatCard = ({
  title,
  value,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 16,
    margin: 6,
    elevation: 2,
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
  },

  title: {
    marginTop: 8,
    color: COLORS.textLight,
    fontSize: 15,
  },
});