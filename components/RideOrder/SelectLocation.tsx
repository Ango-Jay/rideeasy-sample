import { View } from "react-native";
import LocationSearchInput from "../shared/utils/LocationSearchInput";
import globalUtilStyles from "@/styles";
import { bgColorStyle, borderColorStyle } from "@/styles/color";
import { useEffect, useState } from "react";
import CustomPressable from "../shared/buttons/Pressable";
import CustomText from "../shared/Text";
import { RideLocation } from "@/app/(main)/(nestedtabs)/orderRide";
import { useMutation } from "@tanstack/react-query";
import { GET_POSSIBLE_ADDRESS_MATCHES } from "@/lib/api/google";
import { moderateVerticalScale, scale } from "react-native-size-matters";
import { Skeleton } from "moti/skeleton";
import useDebounce from "@/lib/hooks/useDebounce";

interface Props {
  rideLocation: RideLocation;
  setPickupLocation: (value: string, field: "placeId" | "address") => void;
  setDestinationLocation: (value: string, field: "placeId" | "address") => void;
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
  const debouncedPickupAddress = useDebounce({
    value: rideLocation.pickup,
    delay: 1000,
  });
  const debhouncedDestinationAddress = useDebounce({
    value: rideLocation.destination,
    delay: 1000,
  });
  const [showOptions, setShowOptions] = useState(false);
  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: [
      "getPossibleAddressMatches",
      {
        isPickupFocused,
        isDestinationFocused,
      },
    ],
    mutationFn: GET_POSSIBLE_ADDRESS_MATCHES,
  });
  const handleGetPickupAddressOptions = async () => {
    try {
      await mutateAsync({
        address: debouncedPickupAddress,
      });
    } catch {}
  };
  const handleGetDestinationAddressOptions = async () => {
    try {
      await mutateAsync({
        address: debhouncedDestinationAddress,
      });
    } catch {}
  };
  useEffect(() => {
    if (debouncedPickupAddress.length > 5 && isPickupFocused) {
      handleGetPickupAddressOptions();
    }
    if (debhouncedDestinationAddress.length > 5 && isDestinationFocused) {
      handleGetDestinationAddressOptions();
    }
  }, [
    debouncedPickupAddress,
    isPickupFocused,
    debhouncedDestinationAddress,
    isDestinationFocused,
  ]);

  return (
    <View style={[globalUtilStyles.gap2, globalUtilStyles.mt6]}>
      <LocationSearchInput
        placeholder="Pick-up location"
        value={rideLocation.pickup}
        onChangeText={async (text) => {
          setPickupLocation(text, "address");
        }}
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
        onChangeText={(text) => {
          setDestinationLocation(text, "address");
        }}
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
            globalUtilStyles.py2,
            globalUtilStyles.px3,
            globalUtilStyles.gap2,
            {
              minHeight: scale(150),
            },
          ]}
        >
          {isPending &&
            [1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                radius={200}
                colorMode={"light"}
                width={"100%"}
                height={moderateVerticalScale(32, 0.3)}
              />
            ))}

          {!!data?.data?.suggestions?.length &&
            !isPending &&
            data?.data.suggestions.map((item, index, array) => (
              <CustomPressable
                key={item.placePrediction.text.text}
                onPress={() => {
                  if (isPickupFocused) {
                    setPickupLocation(
                      item.placePrediction.text.text,
                      "address",
                    );
                    setPickupLocation(
                      data.data.suggestions[0].placePrediction.placeId,
                      "placeId",
                    );
                    setIsDestinationFocused(true);
                    if (rideLocation.destination) {
                      goToNextStage();
                    }
                  } else {
                    setDestinationLocation(
                      item.placePrediction.text.text,
                      "address",
                    );
                    setDestinationLocation(
                      data.data.suggestions[0].placePrediction.placeId,
                      "placeId",
                    );
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
                    index !== array.length - 1 &&
                      globalUtilStyles.borderBottom1,
                    borderColorStyle.grayLight,
                  ]}
                >
                  <CustomText style={[globalUtilStyles.capitalize]}>
                    {item.placePrediction.text.text}
                  </CustomText>
                </View>
              </CustomPressable>
            ))}
        </View>
      )}
    </View>
  );
};
export default SelectLocation;
