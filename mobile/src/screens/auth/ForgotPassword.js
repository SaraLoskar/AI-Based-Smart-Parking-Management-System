import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { forgotPassword } from "../../services/auth.service";
import LogoHeader from "../../components/auth/LogoHeader";
import InputField from "../../components/inputs/InputFields";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function ForgotPassword({ navigation }) {

  const [email, setEmail] = useState("");

  const handleSendOTP = async () => {
    if (!email.trim()) {
      return Alert.alert("Error", "Enter your email");
    }
    try {
      const response = await forgotPassword(email);
      Alert.alert(
        "OTP Generated",
        `Your OTP is ${response.otp}`,
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("ResetPassword", {
                email,
              }),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
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
        title="Forgot Password?"
        subtitle="Enter your registered email to receive an OTP."
      />

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <PrimaryButton
        title="Send OTP"
        onPress={handleSendOTP}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
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
    paddingTop: 50,
    paddingBottom: 30,
  },

  backButton: {
    alignSelf: "center",
    marginTop: 25,
  },

  backText: {
    fontSize: 16,
    color: "#118A54",
    fontWeight: "600",
  },

});