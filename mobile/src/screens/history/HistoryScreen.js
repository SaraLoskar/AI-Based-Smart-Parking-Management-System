import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

const history = [
  {
    id: "1",
    place: "BKC Multi-Level Parking",
    date: "01 Aug 2026",
    slot: "A2",
    amount: 200,
    status: "Completed",
  },
  {
    id: "2",
    place: "Phoenix Marketcity",
    date: "28 Jul 2026",
    slot: "B3",
    amount: 160,
    status: "Completed",
  },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Booking History
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.place}>
              {item.place}
            </Text>

            <Text style={styles.info}>
              Date : {item.date}
            </Text>

            <Text style={styles.info}>
              Slot : {item.slot}
            </Text>

            <Text style={styles.info}>
              Amount : ₹{item.amount}
            </Text>

            <Text style={styles.status}>
              {item.status}
            </Text>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#FAFBF8",
padding:20,
},

title:{
fontSize:30,
fontWeight:"700",
marginBottom:25,
},

card:{
backgroundColor:"#fff",
padding:18,
borderRadius:18,
marginBottom:18,

shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:8,
elevation:3,
},

place:{
fontSize:18,
fontWeight:"700",
},

info:{
marginTop:8,
fontSize:16,
color:"#555",
},

status:{
marginTop:15,
color:"#118A54",
fontWeight:"700",
},

});