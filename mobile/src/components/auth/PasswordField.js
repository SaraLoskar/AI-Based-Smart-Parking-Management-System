import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function PasswordField({
    placeholder,
    value,
    onChangeText,
}) {
    const [hidden, setHidden] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={hidden}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
            />

            <TouchableOpacity
                onPress={() => setHidden(!hidden)}
            >
                <Ionicons
                    name={hidden ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6B7280"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        marginBottom: 18,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#222",
        borderWidth: 0,   // or remove border completely
        outlineStyle: "none", // if you're testing on React Native Web
    }
});