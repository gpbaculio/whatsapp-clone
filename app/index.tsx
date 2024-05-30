import { Image, StyleSheet, Text } from "react-native";
import React from "react";

import {
  DynamicText,
  DynamicTouchableOpacity,
  DynamicView,
} from "@/components";
import { Link } from "expo-router";

const welcomeImage = require("@/assets/images/welcome.png");
const welcomeImageUri = Image.resolveAssetSource(welcomeImage).uri;

const index = () => {
  const openLink = () => {};
  return (
    <DynamicView p="l" flex={1} variant="centerItems" backgroundColor="white">
      <Image source={{ uri: welcomeImageUri }} style={styles.welcome} />
      <DynamicText mt="xl" fontSize={24} fontWeight="bold" marginVertical="l">
        Welcome to WhatsApp Clone
      </DynamicText>
      <DynamicText fontSize={14} textAlign="center" mb="xl" color="gray">
        {`Read our `}
        <DynamicText color="primary" onPress={openLink}>
          Privacy Policy
        </DynamicText>
        {` Tap "Agree & Continue" to accept the `}
        <DynamicText color="primary" onPress={openLink}>
          Terms of Service
        </DynamicText>
        .
      </DynamicText>
      <Link href={"/otp"} replace asChild>
        <DynamicTouchableOpacity width="100%" alignItems="center">
          <DynamicText fontSize={22} fontWeight="bold" color="primary">
            Agree & Continue
          </DynamicText>
        </DynamicTouchableOpacity>
      </Link>
    </DynamicView>
  );
};

export default index;

const styles = StyleSheet.create({
  welcome: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
