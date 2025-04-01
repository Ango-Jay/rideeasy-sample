import { View } from "react-native";
import LocationSearchInput from "../shared/utils/LocationSearchInput";
import globalUtilStyles from "@/styles";
import { bgColorStyle, borderColorStyle } from "@/styles/color";
import type { RideLocation } from "./BookRide";
import { useState } from "react";
import CustomPressable from "../shared/buttons/Pressable";
import CustomText from "../shared/Text";

interface Props {
  rideLocation: RideLocation;
  setPickupLocation: (location: string) => void;
  setDestinationLocation: (location: string) => void;
  goToNextStage: () => void;
}
const SelectLocation = ({
  rideLocation,
  setDestinationLocation,
  setPickupLocation,
  goToNextStage,
}: Props) => {
  const [isPickupFocused, setIsPickupFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={[globalUtilStyles.gap2, globalUtilStyles.mt6]}>
      <LocationSearchInput
        placeholder="Pick-up location"
        value={rideLocation.pickup}
        onChangeText={(text) => setPickupLocation(text)}
        isFocused={isPickupFocused}
        onBlur={() => {
          setIsPickupFocused(false);
          setShowOptions(false);
        }}
        onFocus={() => {
          setIsPickupFocused(true);
          setShowOptions(true);
        }}
      />
      <LocationSearchInput
        placeholder="Destinationtion"
        value={rideLocation.destination}
        onChangeText={(text) => setDestinationLocation(text)}
        isFocused={isDestinationFocused}
        onBlur={() => {
          setIsDestinationFocused(false);
          setShowOptions(false);
        }}
        onFocus={() => {
          setIsDestinationFocused(true);
          setShowOptions(true);
        }}
      />
      {showOptions && (
        <View
          style={[
            bgColorStyle.white,
            globalUtilStyles.roundedmd,
            globalUtilStyles.pt2,
            globalUtilStyles.gap2,
          ]}
        >
          {[1, 2].map((item, index) => (
            <CustomPressable
              key={item}
              onPress={() => {
                if (isPickupFocused) {
                  setPickupLocation("Tawa");
                  if (rideLocation.destination) {
                    goToNextStage();
                  }
                } else {
                  setDestinationLocation("Ottwaa");
                  if (rideLocation.pickup) {
                    goToNextStage();
                  }
                }
              }}
            >
              <View
                style={[
                  globalUtilStyles.wfull,
                  globalUtilStyles.px2,
                  globalUtilStyles.pb2,
                  index !== 1 && globalUtilStyles.borderBottom1,
                  borderColorStyle.grayLight,
                ]}
              >
                <CustomText>Tulip Pharmacy, Otowo</CustomText>
              </View>
            </CustomPressable>
          ))}
        </View>
      )}
    </View>
  );
};
export default SelectLocation;
