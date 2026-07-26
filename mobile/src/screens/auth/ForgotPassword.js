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
import InputField from "../../components/inputs/InputFields";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function ForgotPassword({ navigation }) {

  const [email, setEmail] = useState("");

  const handleSendOTP = () => {

    if (!email.trim()) {
      return Alert.alert(
        "Error",
        "Please enter your email."
      );
    }

    // Backend will be connected later
    navigation.navigate("OTPVerification");
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