import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import LogoHeader from "../../components/auth/LogoHeader";
import PasswordField from "../../components/auth/PasswordField";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function ResetPassword({ navigation }) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {

    if (!password) {
      return Alert.alert(
        "Error",
        "Please enter your new password."
      );
    }

    if (password.length < 6) {
      return Alert.alert(
        "Error",
        "Password must be at least 6 characters."
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        "Error",
        "Passwords do not match."
      );
    }

    // Backend integration later

    Alert.alert(
      "Success",
      "Password changed successfully.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <LogoHeader
        title="Reset Password"
        subtitle="Create a strong password for your account."
      />

      <PasswordField
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
      />

      <PasswordField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <PrimaryButton
        title="Reset Password"
        onPress={handleReset}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.backText}>
          ← Back to Login
        </Text>
      </TouchableOpacity>

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
    paddingTop: 40,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: "center",
    marginTop: 25,
  },

  backText: {
    color: "#118A54",
    fontWeight: "600",
    fontSize: 15,
  },

});