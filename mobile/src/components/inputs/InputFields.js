import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

export default function InputField({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 18,
    justifyContent: "center",
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    borderWidth: 0,   // or remove border completely
    outlineStyle: "none", // if you're testing on React Native Web
  }
});