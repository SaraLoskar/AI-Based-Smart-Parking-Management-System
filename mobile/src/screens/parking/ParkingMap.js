import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import { getParkingAreas } from "../../services/parking.service";

export default function ParkingMap({ navigation }) {

    const [parkingAreas, setParkingAreas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadParkingAreas();
    }, []);

    const loadParkingAreas = async () => {
        try {

            const data = await getParkingAreas();

            console.log("Map Parking Data:", data);

            setParkingAreas(data);

        } catch (error) {

            console.log(
                "Map Parking Error:",
                error?.response?.data || error.message
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color="#118A54"
                />

                <Text style={styles.loadingText}>
                    Loading parking areas...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}

                initialRegion={{
                    latitude: 19.0760,
                    longitude: 72.8777,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,
                }}
            >

                {parkingAreas.map((parking) => (

                    <Marker
                        key={parking.id}
                        coordinate={{
                            latitude: Number(parking.latitude),
                            longitude: Number(parking.longitude),
                        }}
                        title={parking.name}
                        description={`${parking.availableSlots} slots available`}
                        onCalloutPress={() => {
                            navigation.navigate(
                                "ParkingDetails",
                                {
                                    parking,
                                }
                            );
                        }}
                    />

                ))}

            </MapView>

            <View style={styles.headerCard}>

                <Text style={styles.title}>
                    Nearby Parking
                </Text>

                <Text style={styles.subtitle}>
                    Tap a marker to view parking details
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAFBF8",
    },

    map: {
        flex: 1,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFBF8",
    },

    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#777",
    },

    headerCard: {
        position: "absolute",
        top: 30,
        left: 20,
        right: 20,

        backgroundColor: "#FFFFFF",

        borderRadius: 20,

        paddingHorizontal: 25,
        paddingVertical: 20,

        elevation: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#118A54",
    },

    subtitle: {
        marginTop: 5,
        fontSize: 16,
        color: "#777",
    },

});