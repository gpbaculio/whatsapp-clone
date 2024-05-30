import { Pressable, TouchableOpacity, View } from "react-native";

import {
  createRestyleComponent,
  createText,
  createVariant,
  VariantProps,
} from "@shopify/restyle";

import { Theme } from "@/app/theme";
import Animated from "react-native-reanimated";

const createContainer = (Component: React.ComponentType<any>) => {
  return createRestyleComponent<
    VariantProps<Theme, "containerVariants"> &
      React.ComponentProps<typeof Component>,
    Theme
  >([createVariant({ themeKey: "containerVariants" })], Component);
};

const DynamicText = createText<Theme>();
const DynamicTouchableOpacity = createContainer(TouchableOpacity);
const DynamicPressable = createContainer(Pressable);
const DynamicView = createContainer(View);
const DynamicAnimatedView = Animated.createAnimatedComponent(DynamicView);

export {
  DynamicAnimatedView,
  DynamicView,
  DynamicText,
  DynamicPressable,
  DynamicTouchableOpacity,
};
