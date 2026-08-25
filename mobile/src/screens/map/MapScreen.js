// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     ActivityIndicator,
// } from "react-native";

// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { getParkingAreas } from "../../services/parking.service";

// export default function MapScreen({ navigation }) {

//     const [parkingAreas, setParkingAreas] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         loadParkingAreas();
//     }, []);

//     const loadParkingAreas = async () => {
//         try {

//             const data = await getParkingAreas();

//             console.log("MAP PARKING DATA:", data);

//             setParkingAreas(data || []);

//         } catch (error) {

//             console.log(
//                 "MAP PARKING ERROR:",
//                 error?.response?.data || error.message
//             );

//         } finally {

//             setLoading(false);

//         }
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator
//                     size="large"
//                     color="#118A54"
//                 />

//                 <Text style={styles.loadingText}>
//                     Loading parking areas...
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.container}>

//             <View style={styles.header}>

//                 <Text style={styles.title}>
//                     Nearby Parking
//                 </Text>

//                 <Text style={styles.subtitle}>
//                     Tap a marker to view parking details
//                 </Text>

//             </View>

//             <MapView
//                 provider={PROVIDER_GOOGLE}
//                 style={styles.map}
//                 initialRegion={{
//                     latitude: 19.0760,
//                     longitude: 72.8777,
//                     latitudeDelta: 0.15,
//                     longitudeDelta: 0.15,
//                 }}
//             >

//                 {parkingAreas.map((parking) => (

//                     <Marker
//                         key={parking.id}
//                         coordinate={{
//                             latitude: Number(parking.latitude),
//                             longitude: Number(parking.longitude),
//                         }}
//                         title={parking.name}
//                         description={`${parking.availableSlots} slots available`}
//                         onPress={() => {

//                             navigation.navigate(
//                                 "ParkingDetails",
//                                 {
//                                     parking: parking,
//                                 }
//                             );

//                         }}
//                     />

//                 ))}

//             </MapView>

//             {parkingAreas.length === 0 && (

//                 <View style={styles.emptyContainer}>

//                     <Text style={styles.emptyText}>
//                         No parking areas available
//                     </Text>

//                 </View>

//             )}

//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: "#FAFBF8",
//     },

//     header: {
//         backgroundColor: "#FFFFFF",
//         paddingHorizontal: 24,
//         paddingVertical: 20,
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         elevation: 4,
//         zIndex: 10,
//     },

//     title: {
//         fontSize: 28,
//         fontWeight: "700",
//         color: "#118A54",
//     },

//     subtitle: {
//         marginTop: 5,
//         fontSize: 15,
//         color: "#777",
//     },

//     map: {
//         flex: 1,
//     },

//     loadingContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#FAFBF8",
//     },

//     loadingText: {
//         marginTop: 10,
//         fontSize: 15,
//         color: "#777",
//     },

//     emptyContainer: {
//         position: "absolute",
//         bottom: 30,
//         left: 30,
//         right: 30,
//         backgroundColor: "#FFFFFF",
//         padding: 18,
//         borderRadius: 15,
//         elevation: 5,
//     },

//     emptyText: {
//         textAlign: "center",
//         fontSize: 16,
//         color: "#777",
//     },

// });