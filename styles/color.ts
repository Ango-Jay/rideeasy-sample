import { appColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const textColorStyle = StyleSheet.create({
  primary: {
    color: appColors.primary,
  },
  white: {
    color: appColors.white,
  },
  black: {
    color: appColors.black,
  },
  gray: {
    color: appColors.gray,
  },
  "light-gray": {
    color: appColors["grayLight"],
  },
  error: {
    color: appColors.danger,
  },
});

export const bgColorStyle = StyleSheet.create({
  primary: {
    backgroundColor: appColors.primary,
  },
  white: {
    backgroundColor: appColors.white,
  },
  black: {
    backgroundColor: appColors.black,
  },
  grayLight: {
    backgroundColor: appColors["grayLight"],
  },
});

export const borderColorStyle = StyleSheet.create({
  primary: {
    borderColor: appColors.primary,
  },
  error: {
    borderColor: appColors.danger,
  },
});
