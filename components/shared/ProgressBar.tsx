import { View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";
import { scale } from "react-native-size-matters";

interface Props {
  duration?: number; // in milliseconds
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  style?: ViewStyle;
  onComplete?: () => void;
  isActive?: boolean;
}

const ProgressBar = ({
  duration = 5000, // default 5 seconds
  height = scale(4),
  backgroundColor = "#E5E5E5",
  progressColor = "#007AFF",
  style,
  onComplete,
  isActive = true,
}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      progress.value = 0;
      progress.value = withTiming(
        1,
        {
          duration,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished && onComplete) {
            runOnJS(onComplete)();
          }
        },
      );
    } else {
      progress.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [isActive, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View
      style={[
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: progressColor,
            borderRadius: height / 2,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default ProgressBar;
