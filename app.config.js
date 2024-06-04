module.exports = ({ config }) => {
  return {
    ...config,
    scheme: "whatsapp",
    plugins: [
      "expo-router",
      "expo-secure-store",
      [
        "react-native-fbsdk-next",
        {
          appID: process.env.EXPO_PUBLIC_FB_APPID,
          clientToken: process.env.EXPO_PUBLIC_FB_CLIENT_TOKEN,
          displayName: "Phil",
          scheme: `fb${process.env.EXPO_PUBLIC_FB_APPID}`,
          advertiserIDCollectionEnabled: false,
          autoLogAppEventsEnabled: false,
          isAutoInitEnabled: true,
          iosUserTrackingPermission:
            "This identifier will be used to deliver personalized ads to you.",
        },
      ],
      "expo-tracking-transparency",
    ],
  };
};
