import React from "react";
import {
View,
Text,
StyleSheet,
} from "react-native";

export default function StatCard({

parkingCount,
availableSlots,

}){

return(

<View style={styles.container}>

<View style={styles.box}>

<Text style={styles.value}>
{parkingCount}
</Text>

<Text>Total Parking</Text>

</View>

<View style={styles.box}>

<Text style={styles.value}>
{availableSlots}
</Text>

<Text>Available</Text>

</View>

</View>

);

}

const styles=StyleSheet.create({

container:{
flexDirection:"row",
justifyContent:"space-between",
marginVertical:20,
},

box:{
backgroundColor:"#FFF",
padding:20,
borderRadius:15,
width:"48%",
alignItems:"center",
},

value:{
fontSize:28,
fontWeight:"700",
color:"#118A54",
}

});