import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import InputField from "../../components/inputs/InputFields";
import { resetPassword } from "../../services/auth.service";
import LogoHeader from "../../components/auth/LogoHeader";
import PasswordField from "../../components/auth/PasswordField";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function ResetPassword({
  navigation,
  route,
}) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const email = route.params.email;

  const handleResetPassword = async () => {

    if (!otp.trim()) {
      return Alert.alert("Error", "Enter OTP");
    }

    if (!password.trim()) {
      return Alert.alert("Error", "Enter new password");
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        "Error",
        "Passwords do not match"
      );
    }

    try {

      await resetPassword({
        email,
        otp,
        newPassword: password,
      });

      Alert.alert(
        "Success",
        "Password updated successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"),
          },
        ]
      );

    } catch (error) {

      Alert.alert(
        "Error",
        error.response?.data?.message ||
        "Something went wrong"
      );

    }
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

      <InputField
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
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
        onPress={handleResetPassword}
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