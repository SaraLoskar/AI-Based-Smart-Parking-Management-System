import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import { getParkingAreas } from "../../services/parking.service";

export default function MapScreen() {

  const [parkingAreas, setParkingAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParking();
  }, []);

  const loadParking = async () => {

    try {

      const data = await getParkingAreas();

      setParkingAreas(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <ActivityIndicator size="large" color="#118A54" />;

  }

  return (

    <View style={styles.container}>

      <MapView

        style={styles.map}

        initialRegion={{
          latitude: 19.0760,
          longitude: 72.8777,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}

      >

        {parkingAreas.map((item) => (

          <Marker

            key={item.id}

            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}

            title={item.name}

            description={`${item.availableSlots} Slots Available`}

          />

        ))}

      </MapView>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

});