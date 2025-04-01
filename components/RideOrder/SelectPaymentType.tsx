import { View } from "react-native";
import BackButton from "../shared/buttons/BackButton";
import LocationSearchInput from "../shared/utils/LocationSearchInput";
import globalUtilStyles from "@/styles";
import RadioButton from "../shared/buttons/RadioButton";
import type { RideLocation } from "./BookRide";
import { bgColorStyle } from "@/styles/color";
import { useState } from "react";
import { nairaSymbol } from "@/constants";
import CustomButton from "../shared/buttons";
import CustomText from "../shared/Text";
import CustomPressable from "../shared/buttons/Pressable";

interface Props {
  goToNextStage: () => void;
  goToPreviousStage: () => void;
  rideLocation: RideLocation;
}
const SelectPaymentType = ({
  goToNextStage,
  goToPreviousStage,
  rideLocation,
}: Props) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<
    "cash" | "wallet"
  >("cash");
  const isWallet = selectedPaymentType === "wallet";
  const [isInsufficientFunds] = useState(false);
  return (
    <View style={[globalUtilStyles.flex1, globalUtilStyles.py6]}>
      <View style={[globalUtilStyles.mb6]}>
        <BackButton
          style={[bgColorStyle.white, globalUtilStyles.roundedmd]}
          onPress={goToPreviousStage}
        />
      </View>
      <View>
        <LocationSearchInput
          placeholder="Search for a location"
          onChangeText={() => {}}
          onPress={goToPreviousStage}
          value={rideLocation.destination}
          isFocused={false}
        />
      </View>

      <View style={[globalUtilStyles.mtauto, globalUtilStyles.gap4]}>
        <View style={[globalUtilStyles.gap1]}>
          <RadioButton
            onPress={() => setSelectedPaymentType("cash")}
            isSelected={!isWallet}
            title="Cash"
            suffix={`${nairaSymbol}1500`}
          />
          <RadioButton
            onPress={() => setSelectedPaymentType("wallet")}
            isSelected={isWallet}
            title="Wallet"
            subTitle={`Balance: ${nairaSymbol}0.00`}
            suffix={`${nairaSymbol}1500`}
          />
        </View>
        <CustomButton
          onPress={() => {
            goToNextStage();
          }}
          text="Select Payment type"
        />
      </View>
      {isInsufficientFunds && <InsuffiecientFundsPopup />}
    </View>
  );
};

const InsuffiecientFundsPopup = () => {
  return (
    <View
      style={[
        globalUtilStyles.wfull,
        globalUtilStyles.h40p,
        bgColorStyle.white,
        globalUtilStyles.roundedmd,
        globalUtilStyles.itemsCenter,
        globalUtilStyles.pt3,
        globalUtilStyles.px6,
        globalUtilStyles.gap3,
        globalUtilStyles.absolute,
        globalUtilStyles.bottom0,
        {
          zIndex: 99999,
        },
      ]}
    >
      <CustomText size={14} weight={600}>
        Ooops!
      </CustomText>
      <CustomText style={[globalUtilStyles.textCenter]}>
        Insufficient balance in your wallet for this ride.
      </CustomText>
      <CustomText weight={600}>0.00</CustomText>
      <View
        style={[
          globalUtilStyles.pt2,
          globalUtilStyles.gap2,
          globalUtilStyles.wfull,
        ]}
      >
        <CustomButton text="Deposit" />
        <CustomPressable
          style={[
            globalUtilStyles.wfull,
            globalUtilStyles.itemsCenter,
            globalUtilStyles.justifyCenter,
            globalUtilStyles.py2,
          ]}
        >
          <CustomText size={14} weight={600}>
            Continue with cash
          </CustomText>
        </CustomPressable>
      </View>
    </View>
  );
};
export default SelectPaymentType;
