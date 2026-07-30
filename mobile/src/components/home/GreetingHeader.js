import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default function GreetingHeader({
  userName,
  profileImage,
}) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.greeting}>
          {greeting},
        </Text>

        <Text style={styles.name}>
          {userName || "Guest"}
        </Text>
      </View>

      <Image
        source={
          profileImage
            ? { uri: profileImage }
            : require("../../../assets/images/logo.png")
        }
        style={styles.avatar}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:20,
  },

  greeting:{
    fontSize:17,
    color:"#777",
  },

  name:{
    fontSize:28,
    fontWeight:"700",
    color:"#111",
  },

  avatar:{
    width:55,
    height:55,
    borderRadius:28,
  }

});