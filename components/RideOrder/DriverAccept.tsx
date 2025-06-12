import globalUtilStyles from "@/styles";
import { bgColorStyle, borderColorStyle, textColorStyle } from "@/styles/color";
import { View } from "react-native";
import CustomText from "../shared/Text";
import { moderateVerticalScale, scale } from "react-native-size-matters";
import CustomButton from "../shared/buttons";
import ProgressBar from "../shared/ProgressBar";
import { appColors } from "@/constants/Colors";
import { useState } from "react";
import BackButton from "../shared/buttons/BackButton";
import PhoneIcon from "@/assets/icons/phone.svg";
import MessageIcon from "@/assets/icons/message.svg";
interface Props {
  goToPreviousStage: () => void;
}

const DriverAccept = ({ goToPreviousStage }: Props) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  return (
    <>
      <View
        style={[
          globalUtilStyles.absolute,
          globalUtilStyles.top6,
          globalUtilStyles.left4,
        ]}
      >
        <BackButton
          onPress={goToPreviousStage}
          style={[bgColorStyle.white, globalUtilStyles.roundedmd]}
        />
      </View>
      <View
        style={[
          {
            height: moderateVerticalScale(206),
          },
          globalUtilStyles.wfull,
          globalUtilStyles.justifyCenter,
          bgColorStyle.white,
          globalUtilStyles.roundedtmd,
          globalUtilStyles.absolute,
          globalUtilStyles.bottom0,
          globalUtilStyles.pt4,
          globalUtilStyles.px4,
        ]}
      >
        <CustomText>
          {hasAccepted
            ? "Driver is on the way"
            : "Waiting for driver to accept"}
        </CustomText>
        <View
          style={[
            globalUtilStyles.flexRow,
            globalUtilStyles.itemsCenter,
            globalUtilStyles.justifyBetween,
            globalUtilStyles.my3,
          ]}
        >
          <View
            style={[
              globalUtilStyles.flexRow,
              globalUtilStyles.itemsCenter,
              globalUtilStyles.gap2,
            ]}
          >
            <View
              style={[
                {
                  width: scale(48),
                  height: scale(48),
                },
                bgColorStyle.black,
                globalUtilStyles.roundedfull,
              ]}
            />
            <View>
              <CustomText weight={600}>Banji</CustomText>
              <CustomText size={13}>4.8 (123)</CustomText>
            </View>
          </View>
          <View>
            <CustomText size={11}>
              Toyota Corolla{" "}
              <CustomText size={11} weight={600}>
                APE-765TC
              </CustomText>
            </CustomText>
          </View>
        </View>
        {hasAccepted ? (
          <View
            style={[
              globalUtilStyles.wfull,
              globalUtilStyles.flexRow,
              globalUtilStyles.gap4,
            ]}
          >
            <CustomButton
              containerStyle={[globalUtilStyles.grow]}
              style={[
                globalUtilStyles.grow,
                globalUtilStyles.gap2,
                globalUtilStyles.flexRow,
                globalUtilStyles.itemsCenter,
                bgColorStyle.white,
                globalUtilStyles.border1,
                borderColorStyle.primary,
              ]}
            >
              <PhoneIcon />
              <CustomText
                weight={600}
                size={14}
                style={[textColorStyle.primary]}
              >
                Call
              </CustomText>
            </CustomButton>
            <CustomButton
              containerStyle={[globalUtilStyles.grow]}
              style={[
                globalUtilStyles.grow,
                globalUtilStyles.gap2,
                globalUtilStyles.flexRow,
                globalUtilStyles.itemsCenter,
                bgColorStyle.primary,
                globalUtilStyles.border1,
                borderColorStyle.primary,
              ]}
            >
              <MessageIcon />
              <CustomText weight={600} size={14} style={[textColorStyle.white]}>
                Message
              </CustomText>
            </CustomButton>
          </View>
        ) : (
          <View style={[globalUtilStyles.py5]}>
            <ProgressBar
              duration={0.1 * 60 * 1000}
              progressColor={appColors.primary}
              onComplete={() => setHasAccepted(true)}
            />
          </View>
        )}
      </View>
    </>
  );
};
export default DriverAccept;
