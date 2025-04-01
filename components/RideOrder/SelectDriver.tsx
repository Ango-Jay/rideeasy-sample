import globalUtilStyles from "@/styles";
import { ScrollView, View } from "react-native";
import CustomButton from "../shared/buttons";
import CustomTextInput from "../shared/form/CustomTextInput";
import BackButton from "../shared/buttons/BackButton";
import { bgColorStyle } from "@/styles/color";
import CustomText from "../shared/Text";
import { scale } from "react-native-size-matters";

interface Props {
  goToNextStage: () => void;
  goToPreviousStage: () => void;
}

const SelectDriver = ({ goToNextStage, goToPreviousStage }: Props) => {
  return (
    <View
      style={[
        globalUtilStyles.flex1,
        globalUtilStyles.justifyBetween,
        globalUtilStyles.pb6,
      ]}
    >
      <View style={[globalUtilStyles.mb6]}>
        <BackButton
          style={[bgColorStyle.white, globalUtilStyles.roundedmd]}
          onPress={goToPreviousStage}
        />
      </View>
      <View style={[globalUtilStyles.wfull, globalUtilStyles.gap4]}>
        <CustomTextInput
          labelTitle=""
          placeholder="Search for a driver"
          isSearch
        />
        <ScrollView
          style={[globalUtilStyles.h40p]}
          contentContainerStyle={[globalUtilStyles.gap3]}
        >
          {[1, 2, 3, 4].map((item) => (
            <DriverItem key={item} />
          ))}
        </ScrollView>
        <CustomButton style={[globalUtilStyles.wfull]} text="Book Ride" />
      </View>
    </View>
  );
};

const DriverItem = () => {
  return (
    <View
      style={[
        globalUtilStyles.wfull,
        globalUtilStyles.roundedmd,
        bgColorStyle.white,
        globalUtilStyles.p4,
        globalUtilStyles.flexRow,
        globalUtilStyles.itemsCenter,
        globalUtilStyles.justifyBetween,
      ]}
    >
      <View style={[globalUtilStyles.flexRow, globalUtilStyles.gap2]}>
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
          <CustomText size={13}>Honda Accord</CustomText>
          <CustomText size={13}>4.8 (123)</CustomText>
        </View>
      </View>
      <View>
        <CustomText size={14} weight={600}>
          3 min.
        </CustomText>
        <CustomText size={13}>Away</CustomText>
      </View>
    </View>
  );
};
export default SelectDriver;
