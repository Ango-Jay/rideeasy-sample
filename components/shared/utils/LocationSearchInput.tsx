import globalUtilStyles from "@/styles";
import { bgColorStyle, borderColorStyle } from "@/styles/color";
import { StyleSheet, View, TextInputProps, TextInput } from "react-native";
import { moderateVerticalScale, scale } from "react-native-size-matters";
import { useState } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import CloseIcon from "@/assets/icons/x_mark.svg";
import PointIcon from "@/assets/icons/location_clip.svg";
import { appColors } from "@/constants/Colors";
import { MontserratFontStyle } from "@/styles/fonts";

interface Props extends TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  isFocused: boolean;
}
const LocationSearchInput = ({
  placeholder,
  onChangeText,
  value,
  isFocused,
  ...props
}: Props) => {
  return (
    <View
      style={[
        globalUtilStyles.flex1,
        globalUtilStyles.flexRow,
        globalUtilStyles.gap2,
        globalUtilStyles.itemsCenter,
        styles.inputContainer,
        bgColorStyle.white,
        globalUtilStyles.px3,
        isFocused && globalUtilStyles.border1,
        isFocused && borderColorStyle.primary,
        isFocused && styles.activeBorderRadius,
      ]}
    >
      {value && !isFocused ? <PointIcon /> : <SearchIcon />}
      <TextInput
        {...props}
        onChangeText={onChangeText}
        value={value}
        style={[
          globalUtilStyles.flex1,
          globalUtilStyles.hfull,
          MontserratFontStyle.fontNormal,
        ]}
      />
      {value && isFocused && <CloseIcon fill={appColors.black} />}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    height: moderateVerticalScale(46, 0.1),
    minHeight: moderateVerticalScale(46, 0.1),
    borderRadius: scale(7),
  },
  activeBorderRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
export default LocationSearchInput;
