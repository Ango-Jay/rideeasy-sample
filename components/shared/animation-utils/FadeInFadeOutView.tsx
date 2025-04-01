import { ReactNode } from "react";
import { ViewProps } from "react-native";
import Animated, {
  type AnimatedProps,
  FadeIn,
  FadeOut,
  LayoutAnimationConfig,
} from "react-native-reanimated";

interface Props extends AnimatedProps<ViewProps> {
  children: ReactNode;
  uniqueKey: string;
}
const FadeInFadeOutView = ({ children, uniqueKey, layout, ...rest }: Props) => {
  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View
        layout={layout}
        entering={FadeIn}
        exiting={FadeOut}
        key={uniqueKey}
        {...rest}
      >
        {children}
      </Animated.View>
    </LayoutAnimationConfig>
  );
};

export default FadeInFadeOutView;
