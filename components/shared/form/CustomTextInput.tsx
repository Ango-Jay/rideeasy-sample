import {
  StyleSheet,
  TextInput,
  type ViewStyle,
  type TextInputProps,
} from "react-native";
import { textColorStyle } from "@/styles/color";
import { useEffect, useState } from "react";
import globalUtilStyles from "@/styles";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../Text";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MotiView } from "moti";
import { appColors } from "@/constants/Colors";
//   import EnvelopeIcon from '@/assets/icons/envelope.svg';
import SearchIcon from "@/assets/icons/search.svg";
import { MontserratFontStyle } from "@/styles/fonts";
interface Props extends TextInputProps {
  labelTitle?: string;
  isTouched?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  isEmail?: boolean;
  isSearch?: boolean;
  containerStyle?: ViewStyle;
}
const CustomTextInput = ({
  labelTitle,
  isTouched,
  isDisabled,
  errorMessage,
  isEmail,
  isSearch,
  containerStyle,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const animationValue = useSharedValue(0);
  useEffect(() => {
    if (errorMessage) {
      animationValue.value = withTiming(1);
    } else {
      animationValue.value = withTiming(0);
    }
  }, [errorMessage, animationValue]);
  const animatedContainerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [0, 0.2, 0.4, 0.8, 1],
      [0, -4, 0, 4, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });
  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderWidth: withTiming(isFocused || errorMessage ? 0.5 : 0, {
        duration: 400,
      }),
      borderColor: withTiming(
        isFocused && !errorMessage
          ? appColors.primary
          : errorMessage
            ? appColors.danger
            : "transparent",
        { duration: 400 },
      ),
    };
  });

  return (
    <Animated.View style={[animatedContainerStyle, containerStyle]}>
      {labelTitle && (
        <CustomText
          size={14}
          weight={500}
          style={[textColorStyle.gray, globalUtilStyles.mb2]}
        >
          {labelTitle}
        </CustomText>
      )}

      <MotiView
        transition={{
          type: "timing",
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }}
        style={[
          globalUtilStyles.flexRow,
          globalUtilStyles.gap3,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.roundedlg,
          globalUtilStyles.px3,
          inputStyle.inputContainerHeight,
          globalUtilStyles.boxShadow,
          animatedBorderStyle,
        ]}
      >
        {/* {isEmail && <EnvelopeIcon fill={appColors.gray} />} */}
        {isSearch && <SearchIcon stroke={appColors.gray} />}
        <TextInput
          {...props}
          onBlur={(e) => {
            setIsFocused(false);
            props?.onBlur?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          // placeholderTextColor={
          //   isDisabled
          //     ? "rgba(255, 255, 255, 0.60)"
          //     : "rgba(255, 255, 255, 0.40)"
          // }
          style={[
            globalUtilStyles.flex1,
            globalUtilStyles.hfull,
            globalUtilStyles.roundedlg,
            MontserratFontStyle.fontNormal,
          ]}
        />
      </MotiView>

      {errorMessage && (
        <CustomText size={13} style={[textColorStyle.error]}>
          {errorMessage}
        </CustomText>
      )}
    </Animated.View>
  );
};

export const inputStyle = StyleSheet.create({
  inputContainerHeight: {
    height: moderateScale(49, 0.1),
  },
});

export default CustomTextInput;
