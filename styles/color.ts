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
  purpleLight: {
    backgroundColor: appColors.purpleLight,
  },
  pinkLight: {
    backgroundColor: appColors.pinkLight,
  },
  greenLight: {
    backgroundColor: appColors.greenLight,
  },
  yellowLight: {
    backgroundColor: appColors.yellowLight,
  },
  blueLight: {
    backgroundColor: appColors.blueLight,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  green: {
    backgroundColor: appColors.green,
  },
});

export const borderColorStyle = StyleSheet.create({
  primary: {
    borderColor: appColors.primary,
  },
  error: {
    borderColor: appColors.danger,
  },
  grayLight: {
    borderColor: appColors["grayLight"],
  },
  white: {
    borderColor: appColors.white,
  },
});
