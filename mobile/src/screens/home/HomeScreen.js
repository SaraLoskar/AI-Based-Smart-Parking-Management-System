import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import GreetingHeader from "../../components/home/GreetingHeader";
import SearchBar from "../../components/home/SearchBar";
import ParkingCard from "../../components/cards/ParkingCard";
import StatsCard from "../../components/cards/StatsCard";
import ViewMapButton from "../../components/home/ViewMapButton";
import NearbyParkingHeader from "../../components/home/NearbyParkingHeader";
import ReservationScreen from "../../screens/reservations/ReservationScreen";

import { getParkingAreas } from "../../services/parking.service";

export default function HomeScreen({ navigation }) {

    const [parkingAreas, setParkingAreas] = useState([]);
    const [loading, setLoading] = useState(true);

    const totalParking = parkingAreas.reduce(
        (sum, item) => sum + item.totalSlots,
        0
    );

    const totalAvailable = parkingAreas.reduce(
        (sum, item) => sum + item.availableSlots,
        0
    );

    const [search, setSearch] = useState("");
    const { user } = useAuth();
    console.log(user);

    useEffect(() => {
        loadParking();
    }, []);

    const loadParking = async () => {
        try {
            const data = await getParkingAreas();

            console.log("Parking Data:", data);

            console.log("Parking Areas Received:");
            console.log(data);

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

    const filteredParking = parkingAreas.filter((item) => {

        const query = search.toLowerCase();

        return (
            item.name.toLowerCase().includes(query) ||
            item.address.toLowerCase().includes(query)
        );

    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <GreetingHeader />

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    onFilterPress={() => {
                        console.log("Filter Button");
                    }}
                />

                <NearbyParkingHeader
                    title="Nearby Parking"
                    buttonText="See All"
                    onPress={() => console.log("See All Parking")}
                />

                {filteredParking.length > 0 ? (

                    filteredParking.map((item) => (
                        <ParkingCard
                            key={item.id}
                            parking={item}
                            onPress={(parking) => {
                                navigation.navigate("ParkingDetails", {
                                    parking,
                                });
                            }}
                        />
                    ))

                ) : (

                    <Text
                        style={{
                            textAlign: "center",
                            marginVertical: 35,
                            color: "#888",
                            fontSize: 16,
                        }}
                    >
                        No parking found 🚗
                    </Text>

                )}

                <StatsCard
                    totalParking={totalParking}
                    totalAvailable={totalAvailable}
                />

                <ViewMapButton
                    onPress={() => console.log("Map coming soon")}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFBF8",
        paddingHorizontal: 20,
    },
});