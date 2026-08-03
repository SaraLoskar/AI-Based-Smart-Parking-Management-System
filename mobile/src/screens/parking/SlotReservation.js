import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

export default function SlotReservation({
    route,
    navigation,
}) {

    const { parking, slot } = route.params;

    const [duration, setDuration] = useState(1);

    const total =
        duration * parking.pricePerHour;

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Reservation
            </Text>

            <Text style={styles.name}>
                {parking.name}
            </Text>

            <Text style={styles.info}>
                Selected Slot : {slot}
            </Text>

            <Text style={styles.info}>
                ₹{parking.pricePerHour}/hour
            </Text>

            <Text style={styles.label}>
                Duration
            </Text>

            <View style={styles.row}>

                {[1, 2, 3, 4].map((item) => (

                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.hourButton,

                            duration === item && {
                                backgroundColor: "#118A54",
                            }
                        ]}
                        onPress={() => setDuration(item)}
                    >

                        <Text
                            style={{
                                color:
                                    duration === item
                                        ? "#fff"
                                        : "#118A54",

                                fontWeight: "700",
                            }}
                        >
                            {item}h
                        </Text>

                    </TouchableOpacity>

                ))}

            </View>

            <Text style={styles.total}>
                Total Amount : ₹{total}
            </Text>

            <TouchableOpacity
                style={styles.reserve}
                onPress={() =>
                    navigation.navigate("Payment", {
                        parking,
                        slot,
                        total,
                    })
                }
            >
                <Text style={styles.reserveText}>
                    Proceed To Payment
                </Text>
            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAFBF8",
        padding: 25,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 30,
    },

    name: {
        fontSize: 20,
        fontWeight: "600",
    },

    info: {
        marginTop: 10,
        fontSize: 18,
        color: "#555",
    },

    label: {
        marginTop: 40,
        fontWeight: "700",
        fontSize: 20,
    },

    row: {
        flexDirection: "row",
        marginTop: 20,
    },

    hourButton: {
        width: 65,
        height: 50,
        borderRadius: 12,
        backgroundColor: "#DDF6EA",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    total: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: "700",
        color: "#118A54",
    },

    reserve: {
        marginTop: 50,
        height: 55,
        backgroundColor: "#118A54",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    reserveText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },

});