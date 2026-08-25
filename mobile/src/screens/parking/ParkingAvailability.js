import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getYoloSlots, triggerYoloSimulation } from "../../services/yolo.service";

export default function ParkingAvailability({ route, navigation }) {
  const { parking = {} } = route.params || {};
  const parkingAreaId = parking.id || "parking001";
  const parkingTitle = parking.name || "BKC Multi-Level Parking";

  const [vehicle, setVehicle] = useState("All");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState("");
  const [stats, setStats] = useState({
    total: 8,
    available: 6,
    occupied: 2,
  });

  useEffect(() => {
    fetchLiveSlots();
  }, [parkingAreaId]);

  const fetchLiveSlots = async () => {
    try {
      setLoading(true);
      const data = await getYoloSlots(parkingAreaId);
      if (data && data.slots) {
        setSlots(data.slots);
        const avail = data.slots.filter((s) => s.status === "Available").length;
        const occ = data.slots.filter((s) => s.status === "Occupied").length;
        setStats({
          total: data.slots.length,
          available: avail,
          occupied: occ,
        });
        setLastScanTime(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.log("Failed to load slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleYoloScan = async () => {
    try {
      setScanning(true);
      const res = await triggerYoloSimulation(parkingAreaId);
      if (res && res.success) {
        setStats({
          total: res.totalSlots,
          available: res.availableSlots,
          occupied: res.totalSlots - res.availableSlots,
        });
        setLastScanTime(new Date().toLocaleTimeString());
        // Refresh slot statuses
        await fetchLiveSlots();
        Alert.alert(
          "🤖 YOLO AI Camera Scan",
          `Camera frame processed!\nOccupied Slots: ${res.occupiedSlots.join(", ") || "None"}\nAvailable: ${res.availableSlots}/${res.totalSlots}`
        );
      }
    } catch (err) {
      Alert.alert("AI Error", err.message || "Failed to trigger AI scan");
    } finally {
      setScanning(false);
    }
  };

  const filteredSlots = slots.filter((slot) => {
    if (vehicle === "All") return true;
    return slot.vehicleType === vehicle;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Live Slot Availability</Text>
      <Text style={styles.subTitle}>{parkingTitle}</Text>

      {/* YOLO AI Action Banner */}
      <View style={styles.aiBanner}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="cctv" size={22} color="#118A54" />
            <Text style={styles.aiBannerTitle}>YOLOv8 AI Camera Feed</Text>
          </View>
          <Text style={styles.aiBannerSubtitle}>
            {lastScanTime ? `Last AI scan: ${lastScanTime}` : "Real-time occupancy tracking"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleYoloScan}
          disabled={scanning}
        >
          {scanning ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="sparkles" size={16} color="#fff" />
              <Text style={styles.scanButtonText}>AI Scan</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Vehicle Type Filter */}
      <View style={styles.vehicleContainer}>
        {["All", "Car", "EV", "Bike"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.vehicleButton,
              vehicle === item && styles.activeVehicle,
            ]}
            onPress={() => setVehicle(item)}
          >
            <Text
              style={[
                styles.vehicleText,
                vehicle === item && styles.activeVehicleText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Live Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Slots</Text>
          <Text style={styles.totalNumber}>{stats.total}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[styles.statLabel, { color: "#118A54" }]}>Available</Text>
          <Text style={[styles.availableNumber, { color: "#118A54" }]}>
            {stats.available}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[styles.statLabel, { color: "#EF4444" }]}>Occupied</Text>
          <Text style={[styles.availableNumber, { color: "#EF4444" }]}>
            {stats.occupied}
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.heading}>Parking Bay Layout</Text>
        <TouchableOpacity onPress={fetchLiveSlots}>
          <Ionicons name="refresh" size={20} color="#118A54" />
        </TouchableOpacity>
      </View>

      {/* Real-Time Slot Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#118A54" style={{ marginVertical: 30 }} />
      ) : (
        <View style={styles.slotGrid}>
          {filteredSlots.map((slot) => {
            const isAvailable = slot.status === "Available";
            return (
              <View
                key={slot.id || slot._id}
                style={[
                  styles.slotBox,
                  {
                    borderColor: isAvailable ? "#118A54" : "#EF4444",
                    backgroundColor: isAvailable ? "#F0FAF4" : "#FDF2F2",
                  },
                ]}
              >
                <View style={styles.slotTopRow}>
                  <Text
                    style={[
                      styles.slotNumberText,
                      { color: isAvailable ? "#118A54" : "#EF4444" },
                    ]}
                  >
                    {slot.slotNumber}
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      slot.vehicleType === "EV"
                        ? "ev-station"
                        : slot.vehicleType === "Bike"
                        ? "motorbike"
                        : "car-side"
                    }
                    size={20}
                    color={isAvailable ? "#118A54" : "#EF4444"}
                  />
                </View>

                <View
                  style={[
                    styles.statusPill,
                    {
                      backgroundColor: isAvailable ? "#118A54" : "#EF4444",
                    },
                  ]}
                >
                  <Text style={styles.statusPillText}>{slot.status}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#118A54" }]} />
          <Text style={styles.legendText}>Available (AI Verified)</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#EF4444" }]} />
          <Text style={styles.legendText}>Occupied (Vehicle Detected)</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("SlotReservation", { parking })}
      >
        <Text style={styles.continueText}>Reserve a Slot</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBF8",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },
  subTitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
    marginBottom: 16,
  },
  aiBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2FAF6",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: "#CBEBDC",
    marginBottom: 20,
  },
  aiBannerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#118A54",
    marginLeft: 6,
  },
  aiBannerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#118A54",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 5,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  vehicleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  vehicleButton: {
    width: "23%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  activeVehicle: {
    backgroundColor: "#118A54",
    borderColor: "#118A54",
  },
  vehicleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
  },
  activeVehicleText: {
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  statLabel: {
    fontSize: 13,
    color: "#777",
    marginBottom: 4,
    fontWeight: "600",
  },
  totalNumber: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },
  availableNumber: {
    fontSize: 26,
    fontWeight: "700",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  slotBox: {
    width: "48%",
    borderRadius: 14,
    borderWidth: 1.8,
    padding: 14,
    elevation: 2,
  },
  slotTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  slotNumberText: {
    fontSize: 20,
    fontWeight: "800",
  },
  statusPill: {
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  statusPillText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  continueButton: {
    marginVertical: 20,
    height: 54,
    backgroundColor: "#118A54",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});