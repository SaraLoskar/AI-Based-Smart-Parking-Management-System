import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    StatusBar,
} from "react-native";

export default function GetStarted({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#FAFBF8"
                barStyle="dark-content"
            />

            {/* Background Circle */}
            <View style={styles.circle} />

            {/* Logo */}
            <Image
                source={require("../../../assets/images/logo.png")}
                style={styles.logo}
            />

            {/* Heading */}

            <View style={styles.headingContainer}>
                <Text style={styles.headingBlack}>
                    AI-Based
                </Text>

                <Text style={styles.headingGreen}>
                    Smart Parking
                </Text>

                <Text style={styles.headingBlack}>
                    Management
                </Text>

                <Text style={styles.headingBlack}>
                    System
                </Text>

                <Text style={styles.tagline}>
                    Park Smart. Save Time.
                </Text>

                <Text style={styles.tagline}>
                    Save Fuel. Save Planet.
                </Text>
            </View>

            {/* Optional City Illustration */}
            {/* Replace image name if needed */}
            <Image
                source={require("../../../assets/images/city.png")}
                style={styles.city}
            />

            {/* Car Illustration */}
            <Image
                source={require("../../../assets/images/car.png")}
                style={styles.car}
            />

            {/* Parking Sign */}
            <Image
                source={require("../../../assets/images/parking-sign.png")}
                style={styles.parkingSign}
            />

            {/* Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.buttonText}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFBF8",
        alignItems: "center",
    },

    circle: {
        position: "absolute",
        width: 430,
        height: 430,
        borderRadius: 215,
        backgroundColor: "#E8F7EE",
        top: -170,
        right: -90,
    },

    /* -------- LOGO -------- */

    logo: {
        width: 170,
        height: 170,
        resizeMode: "contain",
        marginTop: 5,
        marginBottom: -5,
        alignSelf: "center",
    },

    headingContainer: {
        width: "88%",
        marginTop: -25,
    },

    headingBlack: {
        fontSize: 36,
        fontWeight: "900",
        color: "#111",
        lineHeight: 41,
    },

    headingGreen: {
        fontSize: 36,
        fontWeight: "900",
        color: "#118A54",
        lineHeight: 41,
    },

    tagline: {
        fontSize: 18,
        color: "#555",
        marginTop: 10,
        lineHeight: 28,
    },

    /* -------- CITY -------- */

    city: {
        position: "absolute",
        left: -35,
        bottom: 100,
        width: "110%",
        height: 400,
        resizeMode: "contain",
    },

    /* -------- CAR -------- */

    car: {
        position: "absolute",
        bottom: 35,
        width: "120%",
        height: 400 ,
        resizeMode: "contain",
        alignSelf: "center",
    },
    
    /* -------- PARKING SIGN -------- */

    parkingSign: {
        position: "absolute",
        left: -475,
        bottom: 120,
        // width: 45,
        height: 350,
        resizeMode: "contain",
    },

    /* -------- BUTTON -------- */

    button: {
        width: "88%",
        height: 55,
        backgroundColor: "#118A54",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        elevation: 8,
    },

    buttonText: {
        color: "#fff",
        fontSize: 21,
        fontWeight: "700",
    },
});