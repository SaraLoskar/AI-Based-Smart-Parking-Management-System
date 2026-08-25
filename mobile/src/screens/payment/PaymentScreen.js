import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";

export default function PaymentScreen({
    route,
    navigation,
}) {

    const {
        parking = { name: "City Mall Parking" },
        slot = "Not selected",
        total = 40,
    } = route.params || {};

    const [method, setMethod] = useState("UPI");

    const methods = [
        "UPI",
        "Card",
        "Cash"
    ];

    const bookParking = () => {

        Alert.alert(
            "Booking Successful",
            `Slot ${slot} Reserved`,
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("Reservations"),
                },
            ]
        );

    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Payment
            </Text>

            <Text style={styles.heading}>
                {parking.name}
            </Text>

            <Text style={styles.info}>
                Slot : {slot}
            </Text>

            <Text style={styles.info}>
                Amount : ₹{total}
            </Text>

            <Text style={styles.select}>
                Select Payment Method
            </Text>

            {
                methods.map(item => (

                    <TouchableOpacity

                        key={item}

                        style={[
                            styles.method,
                            method === item && styles.active,
                        ]}

                        onPress={() => setMethod(item)}
                    >

                        <Text
                            style={{
                                color:
                                    method === item
                                        ? "white"
                                        : "#118A54",
                                fontWeight: "700",
                            }}
                        >
                            {item}
                        </Text>

                    </TouchableOpacity>

                ))
            }

            <TouchableOpacity
                style={styles.pay}
                onPress={bookParking}
            >

                <Text style={styles.payText}>
                    Pay ₹{total}
                </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 25,
        backgroundColor: "#FAFBF8",
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
    },

    heading: {
        marginTop: 25,
        fontSize: 22,
        fontWeight: "600",
    },

    info: {
        marginTop: 10,
        fontSize: 18,
    },

    select: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: "700",
    },

    method: {
        marginTop: 15,
        padding: 18,
        borderRadius: 15,
        backgroundColor: "#DDF6EA",
        alignItems: "center",
    },

    active: {
        backgroundColor: "#118A54",
    },

    pay: {
        marginTop: 45,
        height: 55,
        backgroundColor: "#118A54",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    payText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

});