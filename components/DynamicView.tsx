import { Theme } from "@/app/theme";
import {
  createBox,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import Animated from "react-native-reanimated";

const BoxView = createBox<Theme>();

const DynamicView = createRestyleComponent<
  VariantProps<Theme, "containerVariants"> &
    React.ComponentProps<typeof BoxView>,
  Theme
>([createVariant({ themeKey: "containerVariants" })], BoxView);

export const DynamicAnimatedView =
  Animated.createAnimatedComponent(DynamicView);

export default DynamicView;
