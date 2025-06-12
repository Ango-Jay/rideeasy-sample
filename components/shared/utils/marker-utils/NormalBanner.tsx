import globalUtilStyles from "@/styles";
import { textColorStyle } from "@/styles/color";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "../../Text";

interface Props {
  text: string;
  backgroundColorStyle: StyleProp<ViewStyle>;
}
const NormalBanner = ({ text, backgroundColorStyle }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bannerPole, backgroundColorStyle]} />
      <View
        style={[
          styles.bannerBody,
          backgroundColorStyle,
          globalUtilStyles.roundedfull,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.justifyCenter,
        ]}
      >
        <CustomText
          size={14}
          weight={600}
          style={[textColorStyle.white, globalUtilStyles.textCenter]}
        >
          {text}
        </CustomText>
        <CustomText
          size={14}
          style={[textColorStyle.white, globalUtilStyles.textCenter]}
        >
          mins
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
    marginLeft: scale(23),
  },
  bannerBody: {
    width: scale(50),
    height: scale(50),
    top: scale(-70),
  },
});
export default NormalBanner;
