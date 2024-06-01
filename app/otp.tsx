import {
  Platform,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
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
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { PhoneCodeFactor, SignInFirstFactor } from "@clerk/types";
import { useRouter } from "expo-router";
const { signUp, setActive } = useSignUp();
const { signIn } = useSignIn();

const PH_PHONE = [
  "+",
  "6",
  "3",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
];

const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
const otp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const openLink = () => {
    Linking.openURL("https://galaxies.dev");
  };

  const sendOTP = async () => {
    setLoading(true);

    try {
      await signUp!.create({
        phoneNumber,
      });

      await signUp!.preparePhoneNumberVerification();

      router.push(`/verify/${phoneNumber}`);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === "form_identifier_exists") {
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert("Error", err.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor = supportedFirstFactors.find(
      (factor: SignInFirstFactor) => {
        return factor.strategy === "phone_code";
      }
    ) as PhoneCodeFactor;

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  };

  return (
    <DynamicKeyboardAvoidingView
      flex={1}
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
            placeholder="+63 912 3456 789"
            onChangeText={(masked) => {
              setPhoneNumber(masked);
            }}
            mask={PH_PHONE}
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
