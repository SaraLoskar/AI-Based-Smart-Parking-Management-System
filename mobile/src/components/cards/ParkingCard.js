import React from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
} from "react-native";

export default function ParkingCard({

parking,

}){

return(

<TouchableOpacity style={styles.card}>

<Text style={styles.name}>
{parking.name}
</Text>

<Text style={styles.address}>
{parking.address}
</Text>

<View style={styles.row}>

<Text style={styles.slot}>
Available :
{" "}
{parking.availableSlots}
/
{parking.totalSlots}
</Text>

<Text style={styles.price}>
₹{parking.pricePerHour}/hr
</Text>

</View>

</TouchableOpacity>

);

}

const styles=StyleSheet.create({

card:{
backgroundColor:"#FFF",
padding:18,
borderRadius:18,
marginBottom:15,
},

name:{
fontSize:18,
fontWeight:"700",
},

address:{
marginVertical:8,
color:"#666",
},

row:{
flexDirection:"row",
justifyContent:"space-between",
},

slot:{
color:"#118A54",
fontWeight:"600",
},

price:{
fontWeight:"700",
}

});