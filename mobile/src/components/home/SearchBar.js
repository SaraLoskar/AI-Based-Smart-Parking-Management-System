import React from "react";
import {
View,
TextInput,
StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({

value,
onChangeText,

}){

return(

<View style={styles.container}>

<Ionicons
name="search"
size={22}
color="#888"
/>

<TextInput

placeholder="Search Parking..."
value={value}
onChangeText={onChangeText}
style={styles.input}

/>

</View>

);

}

const styles=StyleSheet.create({

container:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFF",
paddingHorizontal:15,
height:55,
borderRadius:15,
marginBottom:20,
},

input:{
marginLeft:10,
flex:1,
fontSize:16,
}

});