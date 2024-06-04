import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import theme from "./theme";
import { View } from "react-native";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { Settings } from "react-native-fbsdk-next";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const requestTracking = async () => {
      const { status } = await requestTrackingPermissionsAsync();
      Settings.initializeSDK();
      if (status === "granted") {
        await Settings.setAdvertiserTrackingEnabled(true);
      }
    };

    if (loaded) {
      SplashScreen.hideAsync();
      requestTracking();
    }
  }, [loaded]);

  // useEffect(() => {
  //   if (!isLoaded) return;

  //   const inTabsGroup = segments[0] === "(auth)";

  //   if (isSignedIn && !inTabsGroup) {
  //     router.replace("/(tabs)/chats");
  //   } else if (!isSignedIn) {
  //     router.replace("/");
  //   }
  // }, [isSignedIn]);

  if (!loaded) {
    return <View />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="otp"
          options={{
            headerTitle: "Enter Your Phone Number",
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="verify/[phone]"
          options={{
            title: "Verify Your Phone Number",
            headerShown: true,
            headerBackTitle: "Edit number",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayoutNav() {
  return <RootLayout />;
}
