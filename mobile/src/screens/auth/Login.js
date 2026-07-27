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

import { useAuth } from "../../context/AuthContext";
import LogoHeader from "../../components/auth/LogoHeader";
import Divider from "../../components/auth/Divider";
import InputField from "../../components/inputs/InputFields";
import PasswordField from "../../components/auth/PasswordField";
import PrimaryButton from "../../components/button/PrimaryButton";

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { login, loading } = useAuth();

  const handleLogin = async () => {

    if (!email.trim()) {
      return Alert.alert(
        "Error",
        "Please enter your email."
      );
    }

    if (!password) {
      return Alert.alert(
        "Error",
        "Please enter your password."
      );
    }

    try {
      const response = await login(email, password);
      if (response.success) {
        Alert.alert(
          "Success",
          response.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("MainTabs"),
            },
          ]
        );

      } else {
        Alert.alert(
          "Error",
          response.message
        );
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.message ||
        "Something went wrong."
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
        title="Welcome Back!"
        subtitle="Login to continue"
      />

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <PasswordField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>

        <TouchableOpacity
          style={styles.rememberContainer}
          onPress={() => setRemember(!remember)}
        >

          <View
            style={[
              styles.checkbox,
              remember && styles.checkboxActive,
            ]}
          >
            {remember && <Text style={styles.tick}>✓</Text>}
          </View>

          <Text style={styles.remember}>
            Remember Me
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgot}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

      </View>

      <PrimaryButton
        title={loading ? "Logging In..." : "Log In"}
        onPress={handleLogin}
      />

      {/* <Divider />

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

      </View> */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>
          Don't have an account?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signup}>
            Sign Up
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
    paddingTop: 10,
    paddingBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#118A54",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  checkboxActive: {
    backgroundColor: "#118A54",
  },

  tick: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  remember: {
    color: "#666",
    fontSize: 14,
  },

  forgot: {
    color: "#118A54",
    fontWeight: "600",
  },

  // socialButton: {
  //   flex: 1,
  //   height: 50,
  //   borderRadius: 15,
  //   borderWidth: 1,
  //   borderColor: "#DDD",
  //   backgroundColor: "#FFF",

  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  // socialRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   gap: 12,
  //   marginTop: 5,
  // },

  // socialText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#222",
  //   marginLeft: 8,
  // },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  bottomText: {
    color: "#666",
    fontSize: 15,
  },

  signup: {
    marginLeft: 5,
    color: "#118A54",
    fontWeight: "700",
    fontSize: 15,
  },

});