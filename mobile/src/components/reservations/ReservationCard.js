import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ReservationCard({
  booking,
  upcoming = true,
  onQRPress,
  onCancel,
}) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        {booking.parkingName}
      </Text>

      <Text style={styles.address}>
        {booking.address}
      </Text>

      <Text style={styles.info}>
        Slot : {booking.slot}
      </Text>

      <Text style={styles.info}>
        Date : {booking.date}
      </Text>

      <Text style={styles.info}>
        Time : {booking.time}
      </Text>

      <View style={styles.bottom}>

        <Text style={styles.price}>
          ₹{booking.amount}
        </Text>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            {booking.status}
          </Text>
        </View>

      </View>

      {upcoming && (
        <View style={styles.buttons}>

          <TouchableOpacity
            style={styles.qrButton}
            onPress={onQRPress}
          >
            <Text style={styles.buttonText}>
              View QR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#fff",
    borderRadius:20,
    padding:18,
    marginBottom:18,
    elevation:4,
  },

  title:{
    fontSize:20,
    fontWeight:"700",
    color:"#222",
  },

  address:{
    marginTop:5,
    color:"#777",
  },

  info:{
    marginTop:10,
    color:"#555",
    fontSize:15,
  },

  bottom:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:20,
  },

  price:{
    fontSize:22,
    fontWeight:"700",
    color:"#118A54",
  },

  status:{
    backgroundColor:"#EAF9F1",
    paddingHorizontal:14,
    paddingVertical:6,
    borderRadius:15,
  },

  statusText:{
    color:"#118A54",
    fontWeight:"700",
  },

  buttons:{
    flexDirection:"row",
    marginTop:20,
  },

  qrButton:{
    flex:1,
    backgroundColor:"#118A54",
    height:48,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:12,
    marginRight:8,
  },

  cancelButton:{
    flex:1,
    backgroundColor:"#E53935",
    height:48,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:12,
  },

  buttonText:{
    color:"#fff",
    fontWeight:"700",
  },

});