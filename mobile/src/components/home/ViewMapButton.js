import React from "react";
import {
TouchableOpacity,
Text,
StyleSheet,
} from "react-native";

export default function ViewMapButton({

onPress,

}){

return(

<TouchableOpacity
style={styles.button}
onPress={onPress}
>

<Text style={styles.text}>
View Parking Map
</Text>

</TouchableOpacity>

);

}

const styles=StyleSheet.create({

button:{
height:55,
backgroundColor:"#118A54",
borderRadius:15,
justifyContent:"center",
alignItems:"center",
marginTop:10,
marginBottom:30,
},

text:{
color:"#FFF",
fontWeight:"700",
fontSize:17,
}

});