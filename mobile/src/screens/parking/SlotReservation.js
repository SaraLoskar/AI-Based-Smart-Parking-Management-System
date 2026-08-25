import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

export default function SlotReservation({ navigation }) {

    const [selectedLevel, setSelectedLevel] = useState("");

    const [selectedSlot, setSelectedSlot] = useState("");

    const levels = ["L1", "L2", "L3", "L4"];

    const slots = [
        { id: "A1", status: "available" },
        { id: "A2", status: "available" },
        { id: "A3", status: "available" },
        { id: "A4", status: "available" },
        { id: "A5", status: "available" },

        { id: "A6", status: "available" },
        { id: "A7", status: "available" },
        { id: "A8", status: "available" },
        { id: "A9", status: "reserved" },
        { id: "A10", status: "available" },

        { id: "A11", status: "available" },
        { id: "A12", status: "occupied" },
        { id: "A13", status: "available" },
        { id: "A14", status: "available" },
        { id: "A15", status: "reserved" },

        { id: "A16", status: "available" },
        { id: "A17", status: "available" },
        { id: "A18", status: "available" },
        { id: "A19", status: "occupied" },
        { id: "A20", status: "available" },
    ];

    const getColor = (status) => {
        switch (status) {

            case "available":
                return "#EAF7F1";

            case "reserved":
                return "#FFF7DD";

            case "occupied":
                return "#FDECEC";

            case "selected":
                return "#118A54";

            default:
                return "#EAF7F1";
        }
    };

    const getTextColor = (status) => {

        if (status === "selected")
            return "#FFFFFF";

        if (status === "reserved")
            return "#D89B00";

        if (status === "occupied")
            return "#E53935";

        return "#118A54";
    };

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Text style={styles.title}>
                Slot Reservation
            </Text>

            <Text style={styles.heading}>
                Select Level
            </Text>

            <View style={styles.levelRow}>

                {levels.map((level) => (

                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.levelButton,
                            selectedLevel === level && {
                                backgroundColor: "#118A54",
                                borderColor: "#118A54",
                            },
                        ]}
                        onPress={() =>
                            setSelectedLevel(level)
                        }
                    >

                        <Text
                            style={[
                                styles.levelText,
                                selectedLevel === level && {
                                    color: "#fff",
                                },
                            ]}
                        >
                            {level}
                        </Text>

                    </TouchableOpacity>

                ))}

            </View>

            <Text style={styles.heading}>
                Select Slot
            </Text>

            <Text style={styles.subHeading}>
                Tap on any slot to reserve
            </Text>
            {/* Slot Grid */}

            <View style={styles.slotGrid}>

                {slots.map((slot) => (

                    <TouchableOpacity
                        key={slot.id}
                        disabled={
                            slot.status === "occupied" ||
                            slot.status === "reserved"
                        }
                        style={[
                            styles.slotBox,
                            {
                                backgroundColor: getColor(slot.status),
                            },
                            selectedSlot === slot.id && {
                                backgroundColor: "#118A54",
                            },
                        ]}
                        onPress={() => setSelectedSlot(slot.id)}
                    >

                        <Text
                            style={[
                                styles.slotText,
                                {
                                    color:
                                        selectedSlot === slot.id
                                            ? "#FFFFFF"
                                            : getTextColor(slot.status),
                                },
                            ]}
                        >
                            {slot.id}
                        </Text>

                    </TouchableOpacity>

                ))}

            </View>

            {/* Legend */}

            <View style={styles.legendRow}>

                <View style={styles.legendItem}>
                    <View
                        style={[
                            styles.legendDot,
                            { backgroundColor: "#118A54" },
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
                            { backgroundColor: "#FDBA12" },
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
                            { backgroundColor: "#EF4444" },
                        ]}
                    />
                    <Text style={styles.legendText}>
                        Occupied
                    </Text>
                </View>

            </View>

            {/* Selected Slot */}

            <View style={styles.selectedCard}>

                <View>

                    <Text style={styles.selectedLabel}>
                        Selected Slot
                    </Text>

                    <Text style={styles.selectedValue}>
                        {selectedSlot}, {selectedLevel}
                    </Text>

                </View>

                <Text style={styles.price}>
                    ₹40/hr
                </Text>

            </View>

            {/* Reserve Button */}

            <TouchableOpacity
                style={styles.reserveButton}
                onPress={() => {
                    if (!selectedLevel) {
                        alert("Please select a parking level.");
                        return;
                    }

                    if (!selectedSlot) {
                        alert("Please select a parking slot.");
                        return;
                    }

                    navigation.navigate("Payment", {
                        parking: {
                            name: "City Mall Parking",
                        },
                        slot: `${selectedSlot}, ${selectedLevel}`,
                        total: 40,
                    });
                }}
            >

                <Text style={styles.reserveText}>
                    Reserve Slot
                </Text>

            </TouchableOpacity>

            <Text style={styles.timer}>
                Reservation will expire in 09:59
            </Text>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAFBF8",
        paddingHorizontal: 22,
        paddingTop: 28,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222",
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
        marginBottom: 14,
    },

    levelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    levelButton: {
        width: 68,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E6E6E6",
    },

    levelSelected: {
        backgroundColor: "#118A54",
        borderColor: "#118A54",
    },

    levelText: {
        color: "#222",
        fontSize: 15,
        fontWeight: "700",
    },

    levelTextSelected: {
        color: "#FFFFFF",
    },

    subHeading: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
        marginBottom: 25,
    },

    smallText: {
        color: "#888",
        fontSize: 13,
        marginBottom: 18,
    },

    slotGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    slotBox: {
        width: "18%",
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    slotText: {
        fontSize: 15,
        fontWeight: "700",
    },

    legendRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: -56,
        marginBottom: 25,
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },

    legendText: {
        fontSize: 13,
        color: "#555",
    },

    selectedCard: {
        backgroundColor: "#F6F6F6",
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    selectedLabel: {
        color: "#888",
        fontSize: 13,
        marginBottom: 5,
    },

    selectedValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },

    price: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },

    reserveButton: {
        height: 56,
        borderRadius: 14,
        backgroundColor: "#118A54",
        justifyContent: "center",
        alignItems: "center",
    },

    reserveText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    timer: {
        textAlign: "center",
        color: "#777",
        fontSize: 13,
        marginTop: 18,
        marginBottom: 35,
    },

});