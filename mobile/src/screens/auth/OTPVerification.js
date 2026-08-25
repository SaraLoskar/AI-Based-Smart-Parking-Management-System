import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import LogoHeader from "../../components/auth/LogoHeader";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function OTPVerification({ navigation }) {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const handleChange = (text, index) => {

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {

    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {

    const code = otp.join("");

    if (code.length !== 6) {
      return Alert.alert(
        "Invalid OTP",
        "Please enter the complete 6-digit OTP."
      );
    }

    // Backend connection later
    navigation.navigate("ResetPassword");
  };

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <LogoHeader
        title="OTP Verification"
        subtitle="Enter the 6-digit OTP sent to your registered email."
      />

      <View style={styles.otpContainer}>

        {otp.map((digit, index) => (

          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) =>
              handleChange(text, index)
            }
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(digit, index);
              }
            }}
          />

        ))}

      </View>

      <TouchableOpacity>

        <Text style={styles.resend}>
          Resend OTP
        </Text>

      </TouchableOpacity>

      <PrimaryButton
        title="Verify OTP"
        onPress={handleVerify}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >

        <Text style={styles.backText}>
          ← Back
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

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 35,
  },

  otpInput: {
    width: 48,
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#118A54",
  },

  resend: {
    alignSelf: "center",
    color: "#118A54",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 30,
  },

  backButton: {
    marginTop: 25,
    alignSelf: "center",
  },

  backText: {
    color: "#118A54",
    fontWeight: "600",
    fontSize: 15,
  },

});