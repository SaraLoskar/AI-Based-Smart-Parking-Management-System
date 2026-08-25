import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const Header = ({
  title,
  showBack = false,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={{ width: 24 }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
});