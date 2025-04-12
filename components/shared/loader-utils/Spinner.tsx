import { appColors } from "@/constants/Colors";
import globalUtilStyles from "@/styles";
import React, { useEffect } from "react";
import type { ViewProps } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export type Props = ViewProps & {
  small?: boolean;
  isPrimary?: boolean;
  activeStrokeColor?: string;
  radius?: number;
};

export const Spinner: React.FC<Props> = ({ small, isPrimary }) => {
  const R = small ? 18 : 30;
  const STROKE_WIDTH = small ? 6 : 11;
  const rotate = useSharedValue(0.01);
  const progress = useSharedValue(0.4);
  let circle_length = 2 * Math.PI * R;
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circle_length * progress.value,
  }));
  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(rotate);
  }, [rotate]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });
  return (
    <Animated.View style={[spinnerStyle.aspect]}>
      <AnimatedSvg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        style={[
          globalUtilStyles.justifyCenter,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.roundedfull,
          spinnerStyle.spin,
          small && spinnerStyle.small,
          stylez,
        ]}
      >
        <Circle
          cx={"50"}
          cy={"50"}
          r={R}
          strokeWidth={STROKE_WIDTH}
          fill={"transparent"}
          stroke={"transparent"}
        />
        <AnimatedCircle
          cx={"50"}
          cy={"50"}
          r={R}
          fill={"transparent"}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap={"round"}
          stroke={isPrimary ? appColors.gray : appColors.grayLight}
          strokeDasharray={circle_length}
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export const spinnerStyle = ScaledSheet.create({
  aspect: {
    aspectRatio: 1,
  },
  load: {
    height: "100@s",
    width: "100@s",
  },
  spin: {
    height: "60@s",
    width: "60@s",
  },
  small: {
    height: "30@s",
    width: "30@s",
  },
  smallLoad: {
    height: "20@s",
    width: "20@s",
  },
  smallest: {
    height: "14@s",
    width: "14@s",
  },
});
