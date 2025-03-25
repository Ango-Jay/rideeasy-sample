import globalUtilStyles from "@/styles";
import { bgColorStyle, textColorStyle } from "@/styles/color";
import { useState } from "react";
import { ImageBackground, View } from "react-native";
import { scale } from "react-native-size-matters";
import CustomText from "../Text";
import CustomPressable from "../buttons/Pressable";
import EyeOpenIcon from "@/assets/icons/eye.svg";
import EyeClosedIcon from "@/assets/icons/eye_closed.svg";
import { nairaSymbol } from "@/constants";
import background from "@/assets/images/balance_pattern_bg.png";

const BalanceDetails = () => {
  const [showBalance, setShowBalance] = useState(false);
  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };
  return (
    <View
      style={[
        globalUtilStyles.wfull,
        {
          height: scale(200),
        },
        globalUtilStyles.roundedlg,
        bgColorStyle.primary,
      ]}
    >
      <ImageBackground
        source={background}
        style={[
          globalUtilStyles.wfull,
          globalUtilStyles.hfull,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.justifyCenter,
          globalUtilStyles.roundedfull,
        ]}
        resizeMode="cover"
      >
        <View
          style={[
            globalUtilStyles.flexRow,
            globalUtilStyles.itemsCenter,
            globalUtilStyles.gap1,
            globalUtilStyles.mb4,
          ]}
        >
          <CustomText style={[textColorStyle.white]}>Total Balance</CustomText>
          <CustomPressable
            style={[globalUtilStyles.ml2]}
            hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
            onPress={toggleBalance}
          >
            {showBalance ? (
              <EyeClosedIcon fill={"#FFF"} width={16} height={16} />
            ) : (
              <EyeOpenIcon
                stroke={"#FFF"}
                strokeWidth={2}
                width={16}
                height={16}
              />
            )}
          </CustomPressable>
        </View>
        <CustomText
          weight={600}
          size={32}
          style={[textColorStyle.white, globalUtilStyles.textCenter]}
        >
          {showBalance ? nairaSymbol + "1000" : "****"}
        </CustomText>
      </ImageBackground>
    </View>
  );
};
export default BalanceDetails;
