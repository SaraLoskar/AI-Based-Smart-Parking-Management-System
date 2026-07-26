import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import LogoHeader from "../../components/auth/LogoHeader";
import Divider from "../../components/auth/Divider";
import InputField from "../../components/inputs/InputFields";
import PasswordField from "../../components/auth/PasswordField";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function Register({ navigation }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [agree, setAgree] = useState(false);

    const handleRegister = () => {

        if (!name.trim()) {
            return Alert.alert("Error", "Please enter your full name.");
        }

        if (!email.trim()) {
            return Alert.alert("Error", "Please enter your email.");
        }

        if (!phone.trim()) {
            return Alert.alert("Error", "Please enter your phone number.");
        }

        if (!password) {
            return Alert.alert("Error", "Please enter a password.");
        }

        if (password !== confirmPassword) {
            return Alert.alert("Error", "Passwords do not match.");
        }

        if (!agree) {
            return Alert.alert(
                "Terms & Conditions",
                "Please accept Terms & Conditions."
            );
        }

        Alert.alert(
            "Success",
            "Registration will be connected to backend next."
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            <LogoHeader
                title="Create Account"
                subtitle="Join us and park smarter"
            />

            <InputField
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />

            <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <InputField
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <PasswordField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />

            <PasswordField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {/* Checkbox */}

            <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setAgree(!agree)}
            >
                <View
                    style={[
                        styles.checkbox,
                        agree && styles.checkboxChecked,
                    ]}
                >
                    {agree && <Text style={styles.tick}>✓</Text>}
                </View>

                <Text style={styles.checkboxText}>
                    I agree to Terms & Conditions
                </Text>
            </TouchableOpacity>

            <PrimaryButton
                title="Sign Up"
                onPress={handleRegister}
            />

            <Divider />

            <View style={styles.socialRow}>

                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign
                        name="google"
                        size={22}
                        color="#DB4437"
                    />
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome
                        name="apple"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.socialText}>Apple</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>
                    Already have an account?
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.login}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FAFBF8",
    },

    content: {
        paddingHorizontal: 25,
        paddingTop: -20,
        paddingBottom: 20,
    },

    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: -5,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#118A54",
        marginRight: 10,
    },

    checkboxChecked: {
        backgroundColor: "#118A54",
    },

    tick: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
        right: -3,
        margin: -2,
    },

    socialButton: {
        flex: 1,
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#DDD",
        backgroundColor: "#FFF",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginTop: -5,
    },

    socialText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        marginLeft: 8,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },

    bottomText: {
        color: "#666",
        fontSize: 15,
    },

    login: {
        marginLeft: 5,
        color: "#118A54",
        fontWeight: "700",
        fontSize: 15,
    },

});