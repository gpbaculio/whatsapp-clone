import {
  Platform,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import MaskInput from "react-native-mask-input";
import React, { useEffect, useState } from "react";
import {
  DynamicKeyboardAvoidingView,
  DynamicText,
  DynamicTouchableOpacity,
  DynamicView,
} from "@/components";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from "react-native-fbsdk-next";

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
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const openLink = () => {
    Linking.openURL("https://galaxies.dev");
  };

  const getData = () => {
    const infoRequest = new GraphRequest(
      "/me",
      {
        parameters: {
          fields: {
            string: "name,picture.type(large)",
          },
        },
      },
      (error, result) => {
        if (error) {
          console.log("Error fetching data: " + error.toString());
        } else {
          console.log("result ", result);
        }
      }
    );

    new GraphRequestManager().addRequest(infoRequest).start();
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
              Philippines
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

        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data?.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log("logout.")}
        />
        <Button title="Get Data" onPress={getData} />

        {/* <DynamicTouchableOpacity
          width="100%"
          alignItems="center"
          backgroundColor="lightGray"
          padding="s"
          borderRadius={10}
          mb="l"
          style={[phoneNumber !== "" ? styles.enabled : null]}
          onPress={handlePressAsync}
        >
          <DynamicText
            color="gray"
            fontSize={22}
            fontWeight="500"
            style={phoneNumber !== "" ? styles.enabled : null}
          >
            Sign in With Facebook
          </DynamicText>
        </DynamicTouchableOpacity> */}
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
