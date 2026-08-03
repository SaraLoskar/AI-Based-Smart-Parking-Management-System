import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

const bookings = [
  {
    id: "1",
    parking: "BKC Multi-Level Parking",
    slot: "A3",
    date: "02 Aug 2026",
    status: "Active",
    amount: 200,
  },
  {
    id: "2",
    parking: "Phoenix Marketcity Parking",
    slot: "B2",
    date: "28 Jul 2026",
    status: "Completed",
    amount: 160,
  },
];

export default function ReservationScreen() {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        My Reservations
      </Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.row}>

              <Text style={styles.name}>
                {item.parking}
              </Text>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      item.status === "Active"
                        ? "#DDF6EA"
                        : "#ECECEC",
                  },
                ]}
              >

                <Text
                  style={{
                    color:
                      item.status === "Active"
                        ? "#118A54"
                        : "#666",
                    fontWeight: "700",
                  }}
                >
                  {item.status}
                </Text>

              </View>

            </View>

            <Text style={styles.info}>
              Slot : {item.slot}
            </Text>

            <Text style={styles.info}>
              Date : {item.date}
            </Text>

            <Text style={styles.amount}>
              ₹{item.amount}
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

heading:{
fontSize:30,
fontWeight:"700",
marginBottom:20,
},

card:{
backgroundColor:"#fff",
borderRadius:18,
padding:18,
marginBottom:18,
elevation:5,
},

row:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

name:{
fontSize:18,
fontWeight:"700",
flex:1,
},

badge:{
paddingHorizontal:14,
paddingVertical:6,
borderRadius:20,
},

info:{
marginTop:10,
fontSize:16,
color:"#555",
},

amount:{
marginTop:18,
fontSize:22,
fontWeight:"700",
color:"#118A54",
},

});