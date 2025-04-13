import globalUtilStyles from "@/styles";
import { ScrollView, View } from "react-native";
import CustomButton from "../shared/buttons";
import CustomTextInput from "../shared/form/CustomTextInput";
import { bgColorStyle } from "@/styles/color";
import CustomText from "../shared/Text";
import { scale } from "react-native-size-matters";

interface Props {
  goToNextStage: () => void;
}

const SelectDriver = ({ goToNextStage }: Props) => {
  return (
    <View
      style={[
        globalUtilStyles.flex1,
        globalUtilStyles.justifyEnd,
        globalUtilStyles.py6,
      ]}
    >
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
        <CustomButton
          onPress={goToNextStage}
          style={[globalUtilStyles.wfull]}
          text="Book Ride"
        />
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
