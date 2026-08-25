import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default function LogoHeader({
  title,
  subtitle,
}) {

  return (

    <View style={styles.container}>

      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: -20, // Moves entire header upward
  },

  logo: {
    width: 145,
    height: 145,
    resizeMode: "contain",
    marginBottom: 5,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    marginTop: -40,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
  },

});