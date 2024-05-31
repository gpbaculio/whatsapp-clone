import { Platform, Linking, StyleSheet, ActivityIndicator } from "react-native";
import MaskInput from "react-native-mask-input";
import React, { useState } from "react";
import {
  DynamicKeyboardAvoidingView,
  DynamicText,
  DynamicTouchableOpacity,
  DynamicView,
} from "@/components";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const GER_PHONE = [
  `+`,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
const otp = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const openLink = () => {
    Linking.openURL("https://galaxies.dev");
  };

  const sendOTP = async () => {};

  const trySignIn = async () => {};
  return (
    <DynamicKeyboardAvoidingView flex={1}>
      {loading ? (
        <DynamicView
          backgroundColor="white"
          style={StyleSheet.absoluteFill}
          variant="centerItems"
        >
          <ActivityIndicator size="large" color={Colors.primary} />
          <DynamicText fontSize={18} p="m">
            Sending code...
          </DynamicText>
        </DynamicView>
      ) : null}
      <DynamicView
        flex={1}
        alignItems="center"
        p="l"
        backgroundColor="background"
        gap="l"
      >
        <DynamicText fontSize={14} color="gray">
          WhatsApp will need to verify your Account. Carrier charges may Apply.
        </DynamicText>
        <DynamicView
          backgroundColor="white"
          width="100%"
          borderRadius={10}
          p="m"
        >
          <DynamicView variant="rowCenterBetween" p="s" mb="s">
            <DynamicText fontSize={18} color="primary">
              Germany
            </DynamicText>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </DynamicView>
          <DynamicView
            width="100%"
            height={1}
            backgroundColor="gray"
            opacity={0.2}
          />
          <MaskInput
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+12 your phone number"
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={GER_PHONE}
            style={styles.input}
          />
        </DynamicView>
        <DynamicText fontSize={12} textAlign="center" color="black">
          You must be{" "}
          <DynamicText color="primary" onPress={openLink}>
            at least 16 years old
          </DynamicText>{" "}
          to register. Learn how WhatsApp works with the{" "}
          <DynamicText color="primary" onPress={openLink}>
            Meta Companies
          </DynamicText>
          .
        </DynamicText>

        <DynamicView flex={1} />

        <DynamicTouchableOpacity
          width="100%"
          alignItems="center"
          backgroundColor="lightGray"
          padding="s"
          borderRadius={10}
          mb="l"
          style={[phoneNumber !== "" ? styles.enabled : null]}
          onPress={sendOTP}
        >
          <DynamicText
            color="gray"
            fontSize={22}
            fontWeight="500"
            style={phoneNumber !== "" ? styles.enabled : null}
          >
            Next
          </DynamicText>
        </DynamicTouchableOpacity>
      </DynamicView>
    </DynamicKeyboardAvoidingView>
  );
};

export default otp;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
});
