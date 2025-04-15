import globalUtilStyles from "@/styles";
import { ScrollView, View } from "react-native";
import CustomButton from "../shared/buttons";
import CustomTextInput from "../shared/form/CustomTextInput";
import { bgColorStyle } from "@/styles/color";
import CustomText from "../shared/Text";
import { scale } from "react-native-size-matters";
import { useState } from "react";
import CustomPressable from "../shared/buttons/Pressable";

interface Props {
  goToNextStage: () => void;
}

const SelectDriver = ({ goToNextStage }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };
  const isBookingDisabled = selectedDriver === null;
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
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          isSearch
        />
        <ScrollView
          style={[globalUtilStyles.h40p]}
          contentContainerStyle={[globalUtilStyles.gap3]}
        >
          {MOCK_DRIVERS.filter((item) => {
            if (!searchText) return true;
            return item.name.toLowerCase().includes(searchText.toLowerCase());
          }).map((item) => (
            <DriverItem
              key={item.id}
              details={item}
              selectedDriver={selectedDriver}
              handleSelectDriver={handleSelectDriver}
            />
          ))}
        </ScrollView>
        <CustomButton
          disabled={isBookingDisabled}
          onPress={goToNextStage}
          style={[globalUtilStyles.wfull]}
          text="Book Ride"
        />
      </View>
    </View>
  );
};

const DriverItem = ({
  details,
  handleSelectDriver,
  selectedDriver,
}: {
  details: Driver;
  handleSelectDriver: (driver: Driver) => void;
  selectedDriver: Driver | null;
}) => {
  return (
    <CustomPressable
      onPress={() => handleSelectDriver(details)}
      style={[
        globalUtilStyles.wfull,
        globalUtilStyles.roundedmd,
        details.id === selectedDriver?.id
          ? bgColorStyle.blueLight
          : bgColorStyle.white,
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
          <CustomText weight={600} style={[globalUtilStyles.capitalize]}>
            {details.name}
          </CustomText>
          <CustomText size={13} style={[globalUtilStyles.capitalize]}>
            {details.car}
          </CustomText>
          <CustomText size={13}>
            {details.rating} ({details.noOfRides})
          </CustomText>
        </View>
      </View>
      <View>
        <CustomText size={14} weight={600}>
          {details.distance}
        </CustomText>
        <CustomText size={13}>Away</CustomText>
      </View>
    </CustomPressable>
  );
};

type Driver = {
  id: number;
  name: string;
  car: string;
  rating: number;
  distance: string;
  noOfRides: number;
};
const MOCK_DRIVERS: Driver[] = [
  {
    id: 1,
    name: "Banji",
    car: "Honda Accord",
    rating: 4.8,
    distance: "3 min.",
    noOfRides: 223,
  },
  {
    id: 2,
    name: "Tunde",
    car: "Toyota Camry",
    rating: 4.5,
    distance: "5 min.",
    noOfRides: 456,
  },
  {
    id: 3,
    name: "Sarah",
    car: "Kia Soul",
    rating: 4.9,
    distance: "2 min.",
    noOfRides: 189,
  },
  {
    id: 4,
    name: "John",
    car: "Nissan Altima",
    rating: 4.7,
    distance: "4 min.",
    noOfRides: 321,
  },
];
export default SelectDriver;
