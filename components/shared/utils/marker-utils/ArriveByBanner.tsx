import globalUtilStyles from "@/styles";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../../Text";
import { textColorStyle } from "@/styles/color";

interface Props {
  text: string;
  backgroundColorStyle: StyleProp<ViewStyle>;
}
const ArriveByBanner = ({ text, backgroundColorStyle }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bannerPole, backgroundColorStyle]} />
      <View
        style={[
          styles.bannerBody,
          backgroundColorStyle,
          globalUtilStyles.flexRow,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.gap1,
          globalUtilStyles.roundedfull,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.justifyCenter,
        ]}
      >
        <CustomText size={14} style={[textColorStyle.white]}>
          Arrive in
        </CustomText>
        <CustomText size={14} weight={600} style={[textColorStyle.white]}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: scale(-6),
  },
  bannerPole: {
    width: scale(4),
    height: verticalScale(20),
    marginLeft: scale(68),
  },
  bannerBody: {
    width: scale(140),
    height: scale(50),
    top: scale(-70),
  },
});
export default ArriveByBanner;
