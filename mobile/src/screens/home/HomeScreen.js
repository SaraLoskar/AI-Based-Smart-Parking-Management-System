import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import GreetingHeader from "../../components/home/GreetingHeader";
import SearchBar from "../../components/home/SearchBar";
import ParkingCard from "../../components/cards/ParkingCard";
import StatCard from "../../components/cards/StatCard";
import ViewMapButton from "../../components/home/ViewMapButton";

import { getParkingAreas } from "../../services/parking.service";

export default function HomeScreen() {

    const [parkingAreas, setParkingAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { user } = useAuth();
    console.log(user);

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
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <GreetingHeader
                    userName="Sara"
                    profileImage=""
                />

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                />

                {parkingAreas.map((item) => (
                    <ParkingCard
                        key={item.id}
                        parking={item}
                    />
                ))}

                <StatCard
                    parkingCount={parkingAreas.length}
                    availableSlots={
                        parkingAreas.reduce(
                            (total, item) => total + item.availableSlots,
                            0
                        )
                    }
                />

                <ViewMapButton
                    onPress={() => {
                        console.log("Open Map");
                    }}
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