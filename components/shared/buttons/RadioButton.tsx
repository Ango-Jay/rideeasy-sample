import { StyleSheet, View, type TouchableOpacityProps } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import CustomPressable from "./Pressable";
import globalUtilStyles from "@/styles";
import { bgColorStyle, borderColorStyle } from "@/styles/color";
import CustomText from "../Text";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  onPress: () => void;
  isSelected: boolean;
  title: string;
  subTitle?: string;
  suffix?: string;
}
const RadioButton = ({
  onPress,
  isSelected,
  title,
  subTitle,
  suffix,
}: Props) => {
  return (
    <CustomPressable
      onPress={onPress}
      style={[
        globalUtilStyles.wfull,
        {
          height: moderateVerticalScale(48, 0.1),
          borderRadius: scale(7),
          borderWidth: moderateScale(1.3, 0.3),
        },
        isSelected ? bgColorStyle.blueLight : bgColorStyle.white,
        isSelected ? borderColorStyle.primary : borderColorStyle.white,
        globalUtilStyles.flexRow,
        globalUtilStyles.itemsCenter,
        globalUtilStyles.justifyBetween,
        globalUtilStyles.px4,
      ]}
    >
      <View
        style={[
          globalUtilStyles.flexRow,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.gap3,
        ]}
      >
        <Animated.View
          key={`radio-${isSelected}`}
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            styles.radioContainer,
            globalUtilStyles.border1,
            isSelected ? borderColorStyle.primary : borderColorStyle.grayLight,
          ]}
        >
          <View
            style={[
              globalUtilStyles.wfull,
              globalUtilStyles.hfull,
              globalUtilStyles.roundedfull,
              isSelected ? bgColorStyle.primary : bgColorStyle.white,
            ]}
          />
        </Animated.View>
        <View style={[globalUtilStyles.gap1]}>
          <CustomText weight={600}>{title}</CustomText>
          {subTitle && <CustomText size={12}>{subTitle}</CustomText>}
        </View>
      </View>
      {suffix && (
        <CustomText size={14} weight={600}>
          {suffix}
        </CustomText>
      )}
    </CustomPressable>
  );
};
const styles = StyleSheet.create({
  radioContainer: {
    width: moderateScale(10, 0.3),
    height: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    padding: moderateScale(1, 0.3),
  },
});
export default RadioButton;
