import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {

  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: logout,
        },
      ]
    );
  };

  const menu = [
    {
      title: "My Vehicles",
      icon: "car-outline",
    },
    {
      title: "Payment Methods",
      icon: "card-outline",
    },
    {
      title: "Notifications",
      icon: "notifications-outline",
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
    },
    {
      title: "Settings",
      icon: "settings-outline",
    },
  ];

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.profileBox}>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={60}
            color="#118A54"
          />
        </View>

        <Text style={styles.name}>
          {user?.fullName || "User"}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

      </View>

      {menu.map((item) => (

        <TouchableOpacity
          key={item.title}
          style={styles.menuItem}
        >

          <Ionicons
            name={item.icon}
            size={24}
            color="#118A54"
          />

          <Text style={styles.menuText}>
            {item.title}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />

        </TouchableOpacity>

      ))}

      <TouchableOpacity
        style={styles.logout}
        onPress={handleLogout}
      >

        <Ionicons
          name="log-out-outline"
          size={24}
          color="#fff"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#FAFBF8",
},

content:{
paddingHorizontal:20,
paddingTop:20,
paddingBottom:130,
},

profileBox:{
alignItems:"center",
marginBottom:35,
},

avatar:{
height:110,
width:110,
borderRadius:55,
backgroundColor:"#EAF9F1",
justifyContent:"center",
alignItems:"center",
marginBottom:15,
},

name:{
fontSize:24,
fontWeight:"700",
},

email:{
marginTop:6,
fontSize:16,
color:"#666",
},

menuItem:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:18,
borderRadius:18,
marginBottom:15,

shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:5,
shadowOffset:{
width:0,
height:2,
},
elevation:2,
},

menuText:{
flex:1,
marginLeft:18,
fontSize:17,
fontWeight:"600",
},

logout:{
marginTop:20,
height:58,
borderRadius:18,
backgroundColor:"#E53935",
justifyContent:"center",
alignItems:"center",
flexDirection:"row",

marginBottom:30,
},

logoutText:{
marginLeft:10,
fontSize:18,
fontWeight:"700",
color:"#fff",
},

});