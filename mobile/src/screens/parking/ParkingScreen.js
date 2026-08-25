import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import ParkingCard from "../../components/cards/ParkingCard";
import { getParkingAreas } from "../../services/parking.service";

export default function ParkingScreen({ navigation }) {

  const [parkingAreas, setParkingAreas] = useState([]);

  useEffect(() => {
    loadParking();
  }, []);

  const loadParking = async () => {
    const data = await getParkingAreas();
    setParkingAreas(data);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        All Parking Areas
      </Text>

      <FlatList
        data={parkingAreas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <ParkingCard
            parking={item}
            onPress={(parking)=>
              navigation.navigate("ParkingDetails",{
                parking,
              })
            }
          />

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
    fontSize:28,
    fontWeight:"700",
    marginBottom:20,
  },

});