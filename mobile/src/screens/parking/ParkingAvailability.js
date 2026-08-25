import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ParkingAvailability({ navigation }) {

  const [vehicle, setVehicle] = useState("Car");

  const [selectedLevel, setSelectedLevel] = useState("L1");

  const stats = {
    total: 120,
    available: 32,
    occupied: 80,
    reserved: 8,
  };

  const parkingLevels = [
    {
      level: "L1",
      available: 12,
      slots: [
        "reserved",
        "available",
        "available",
        "available",
        "available",
        "reserved",
        "reserved",
        "occupied",
        "reserved",
      ],
    },
    {
      level: "L2",
      available: 8,
      slots: [
        "occupied",
        "available",
        "available",
        "available",
        "reserved",
        "reserved",
        "reserved",
        "reserved",
        "occupied",
      ],
    },
    {
      level: "L3",
      available: 5,
      slots: [
        "available",
        "available",
        "available",
        "reserved",
        "reserved",
        "reserved",
        "occupied",
        "occupied",
        "available",
      ],
    },
    {
      level: "L4",
      available: 0,
      slots: [
        "available",
        "occupied",
        "occupied",
        "occupied",
        "reserved",
        "occupied",
        "occupied",
        "occupied",
        "reserved",
      ],
    },
  ];

  const getDotColor = (status) => {
    switch (status) {
      case "available":
        return "#118A54";

      case "reserved":
        return "#FDBA12";

      case "occupied":
        return "#EF4444";
    }
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Parking Availability
      </Text>

      {/* Vehicle Buttons */}

      <View style={styles.vehicleContainer}>

        {["Car", "Bike", "EV"].map((item) => (

          <TouchableOpacity
            key={item}
            style={[
              styles.vehicleButton,
              vehicle === item &&
              styles.activeVehicle,
            ]}
            onPress={() => setVehicle(item)}
          >

            <Text
              style={[
                styles.vehicleText,
                vehicle === item &&
                styles.activeVehicleText,
              ]}
            >
              {item}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* Stats */}

      <View style={styles.statsContainer}>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Total Slots
          </Text>

          <Text style={styles.totalNumber}>
            {stats.total}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text
            style={[
              styles.statLabel,
              { color: "#118A54" },
            ]}
          >
            Available
          </Text>

          <Text
            style={[
              styles.availableNumber,
              { color: "#118A54" },
            ]}
          >
            {stats.available}
          </Text>
        </View>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statCard}>
          <Text
            style={[
              styles.statLabel,
              { color: "#EF4444" },
            ]}
          >
            Occupied
          </Text>

          <Text
            style={[
              styles.availableNumber,
              { color: "#EF4444" },
            ]}
          >
            {stats.occupied}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text
            style={[
              styles.statLabel,
              { color: "#FDBA12" },
            ]}
          >
            Reserved
          </Text>

          <Text
            style={[
              styles.availableNumber,
              { color: "#FDBA12" },
            ]}
          >
            {stats.reserved}
          </Text>
        </View>

      </View>

      <Text style={styles.heading}>
        Live Parking Status
      </Text>

      {/* Live Parking Status */}

      <View style={styles.statusContainer}>

        {parkingLevels.map((level, index) => (

          <View
            key={level.level}
            style={[
              styles.levelRow,
              index === parkingLevels.length - 1 && {
                borderBottomWidth: 0,
                marginBottom: 0,
                paddingBottom: 0,
              },
            ]}
          >

            <View style={styles.levelHeader}>

              <Text style={styles.levelName}>
                {level.level}
              </Text>

              <Text style={styles.availableText}>
                {level.available} available
              </Text>

            </View>

            <View style={styles.dotRow}>

              {level.slots.map(
                (slot, index) => (

                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          getDotColor(slot),
                      },
                    ]}
                  />

                )
              )}

            </View>

          </View>

        ))}

      </View>

      {/* Legend */}

      <View style={styles.legendContainer}>

        <View style={styles.legendItem}>

          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  "#118A54",
              },
            ]}
          />

          <Text style={styles.legendText}>
            Available
          </Text>

        </View>

        <View style={styles.legendItem}>

          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  "#FDBA12",
              },
            ]}
          />

          <Text style={styles.legendText}>
            Reserved
          </Text>

        </View>

        <View style={styles.legendItem}>

          <View
            style={[
              styles.legendDot,
              {
                backgroundColor:
                  "#EF4444",
              },
            ]}
          />

          <Text style={styles.legendText}>
            Occupied
          </Text>

        </View>

      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() =>
          navigation.navigate(
            "SlotReservation"
          )
        }
      >

        <Text style={styles.continueText}>
          Continue
        </Text>

      </TouchableOpacity>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FAFBF8",
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
    marginBottom: 25,
  },

  vehicleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  vehicleButton: {
    width: "31%",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  activeVehicle: {
    backgroundColor: "#118A54",
  },

  vehicleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  activeVehicleText: {
    color: "#fff",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  statLabel: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
    fontWeight: "600",
  },

  totalNumber: {
    fontSize: 38,
    fontWeight: "700",
    color: "#222",
  },

  availableNumber: {
    fontSize: 38,
    fontWeight: "700",
  },

  heading: {
    marginTop: 18,
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },

  statusContainer: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  levelRow: {
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  levelName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  availableText: {
    fontSize: 15,
    color: "#118A54",
    fontWeight: "700",
  },

  dotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },

  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 28,
    marginBottom: 30,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },

  legendText: {
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
  },

  continueButton: {
    marginBottom: 35,
    height: 60,
    backgroundColor: "#118A54",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

});