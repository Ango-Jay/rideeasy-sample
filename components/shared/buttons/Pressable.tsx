import type { ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props extends PressableProps {
  children: ReactNode;
  shouldAnimate?: boolean;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const CustomPressable = ({
  children,
  shouldAnimate = true,
  ...props
}: Props) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const innerContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value),
      transform: [
        {
          scale: withTiming(scale.value),
        },
      ],
    };
  });
  return (
    <AnimatedPressable
      hitSlop={
        typeof props.hitSlop !== "undefined"
          ? props.hitSlop
          : { top: 16, bottom: 16, left: 16, right: 16 }
      }
      style={[props.style, innerContainerAnimatedStyle]}
      onPressIn={() => {
        if (shouldAnimate) {
          scale.value = 0.95;
          opacity.value = 0.75;
        }
      }}
      onPressOut={() => {
        if (shouldAnimate) {
          scale.value = 1;
          opacity.value = 1;
        }
      }}
      onPress={(e) => {
        props.onPress?.(e);
      }}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};

export default CustomPressable;
