import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import GreetingHeader from "../../components/home/GreetingHeader";
import SearchBar from "../../components/home/SearchBar";
import ParkingCard from "../../components/cards/ParkingCard";
import StatsCard from "../../components/cards/StatsCard";
import ViewMapButton from "../../components/home/ViewMapButton";
import NearbyParkingHeader from "../../components/home/NearbyParkingHeader";

import { getNearbyParkingAreas, getParkingAreas } from "../../services/parking.service";

// Default fallback coordinates (Mumbai Center / BKC)
const DEFAULT_COORDS = {
    latitude: 19.0760,
    longitude: 72.8777,
};

export default function HomeScreen({ navigation }) {
    const [parkingAreas, setParkingAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [userLocation, setUserLocation] = useState(DEFAULT_COORDS);
    const [locationStatus, setLocationStatus] = useState("Detecting GPS location...");
    const [locationEnabled, setLocationEnabled] = useState(false);

    const { user } = useAuth();

    const totalParking = parkingAreas.reduce(
        (sum, item) => sum + (item.totalSlots || 0),
        0
    );

    const totalAvailable = parkingAreas.reduce(
        (sum, item) => sum + (item.availableSlots || 0),
        0
    );

    useEffect(() => {
        detectUserLocation();
    }, []);

    // Detect user's current GPS location
    const detectUserLocation = () => {
        setLocationStatus("Detecting GPS location...");

        if (typeof navigator !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setUserLocation(coords);
                    setLocationEnabled(true);
                    setLocationStatus(
                        `📍 Location: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
                    );
                    loadNearbyParking(coords.latitude, coords.longitude);
                },
                (error) => {
                    console.log("GPS Location Error / Permission denied:", error.message);
                    setLocationEnabled(false);
                    setLocationStatus("📍 Using default location (Mumbai BKC)");
                    loadNearbyParking(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude);
                },
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
            );
        } else {
            setLocationEnabled(false);
            setLocationStatus("📍 Location: Mumbai Area");
            loadNearbyParking(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude);
        }
    };

    const loadNearbyParking = async (lat, lng) => {
        try {
            setLoading(true);
            const data = await getNearbyParkingAreas(lat, lng, 25, "distance");
            setParkingAreas(data || []);
        } catch (err) {
            console.log("Failed to load nearby parking:", err);
            const fallback = await getParkingAreas();
            setParkingAreas(fallback || []);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        detectUserLocation();
    };

    const filteredParking = parkingAreas.filter((item) => {
        const query = search.toLowerCase();
        return (
            (item.name && item.name.toLowerCase().includes(query)) ||
            (item.address && item.address.toLowerCase().includes(query))
        );
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#118A54"]} />
                }
            >
                <GreetingHeader />

                {/* Location Bar with GPS Enable Button */}
                <View style={styles.locationBar}>
                    <View style={styles.locationInfo}>
                        <Ionicons
                            name={locationEnabled ? "navigate-circle" : "location"}
                            size={18}
                            color={locationEnabled ? "#118A54" : "#E5A00D"}
                        />
                        <Text style={styles.locationText} numberOfLines={1}>
                            {locationStatus}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.refreshLocBtn}
                        onPress={detectUserLocation}
                    >
                        <Ionicons name="locate" size={16} color="#118A54" />
                        <Text style={styles.refreshLocText}>GPS</Text>
                    </TouchableOpacity>
                </View>

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    onFilterPress={() => {
                        console.log("Filter Button");
                    }}
                />

                <NearbyParkingHeader
                    title="Nearest Parking Areas"
                    buttonText="Refresh"
                    onPress={detectUserLocation}
                />

                {loading && !refreshing ? (
                    <ActivityIndicator
                        size="large"
                        color="#118A54"
                        style={{ marginVertical: 30 }}
                    />
                ) : filteredParking.length > 0 ? (
                    filteredParking.map((item) => (
                        <ParkingCard
                            key={item.id || item._id}
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
                        No nearby parking found in this radius 🚗
                    </Text>
                )}

                <StatsCard
                    totalParking={totalParking}
                    totalAvailable={totalAvailable}
                />

                <ViewMapButton
                    onPress={() => navigation.navigate("ParkingDetails", { parking: parkingAreas[0] || {} })}
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
    locationBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F0F9F4",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#D2EFE0",
    },
    locationInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 8,
    },
    locationText: {
        fontSize: 13,
        color: "#2C3E50",
        fontWeight: "600",
        marginLeft: 6,
    },
    refreshLocBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#118A54",
    },
    refreshLocText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#118A54",
        marginLeft: 3,
    },
});