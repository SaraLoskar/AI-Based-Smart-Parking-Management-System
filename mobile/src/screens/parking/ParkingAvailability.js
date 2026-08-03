import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function ParkingAvailability({
  route,
  navigation,
}) {
  const { parking } = route.params;

  const slots = [
    { id: "A1", available: true },
    { id: "A2", available: false },
    { id: "A3", available: true },
    { id: "A4", available: true },

    { id: "B1", available: false },
    { id: "B2", available: true },
    { id: "B3", available: true },
    { id: "B4", available: false },

    { id: "C1", available: true },
    { id: "C2", available: true },
    { id: "C3", available: false },
    { id: "C4", available: true },
  ];

  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Available Slots
      </Text>

      <Text style={styles.subtitle}>
        {parking.name}
      </Text>

      <FlatList
        data={slots}
        numColumns={4}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 30 }}
        renderItem={({ item }) => {

          const selected =
            selectedSlot === item.id;

          return (

            <TouchableOpacity
              disabled={!item.available}
              onPress={() => setSelectedSlot(item.id)}
              style={[
                styles.slot,

                {
                  backgroundColor:
                    !item.available
                      ? "#E74C3C"
                      : selected
                        ? "#0E7A4B"
                        : "#DDF6EA",
                },
              ]}
            >
              <Text
                style={[
                  styles.slotText,
                  {
                    color:
                      !item.available || selected
                        ? "#fff"
                        : "#118A54",
                  },
                ]}
              >
                {item.id}
              </Text>

            </TouchableOpacity>

          );
        }}
      />

      <TouchableOpacity
        disabled={!selectedSlot}
        style={[
          styles.button,
          {
            opacity: selectedSlot ? 1 : 0.5,
          },
        ]}
        onPress={() =>
          navigation.navigate("SlotReservation", {
            parking,
            slot: selectedSlot,
          })
        }
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FAFBF8",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    marginTop: 10,
    color: "#777",
    fontSize: 17,
  },

  slot: {
    flex: 1,
    maxWidth: "22%",
    aspectRatio: 1,
    borderRadius: 15,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  slotText: {
    fontWeight: "700",
    fontSize: 18,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#118A54",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

});