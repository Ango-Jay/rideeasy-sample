import globalUtilStyles from "@/styles";
import { bgColorStyle, textColorStyle } from "@/styles/color";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import BackButton from "@/components/shared/buttons/BackButton";
import { Tab, TabPanel } from "@/components/shared/utils/Tabs";
import CustomText from "@/components/shared/Text";
import { scale } from "react-native-size-matters";
import CustomPressable from "@/components/shared/buttons/Pressable";
import SelectLocation from "@/components/RideOrder/SelectLocation";
import SelectPaymentType from "@/components/RideOrder/SelectPaymentType";
import FadeInFadeOutView from "@/components/shared/animation-utils/FadeInFadeOutView";
import SelectDriver from "@/components/RideOrder/SelectDriver";

export default function OrderRide() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  useEffect(() => {
    const getCurrentLocation = async () => {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getCurrentLocation();
  }, []);

  const [currentTab, setCurrentTab] = useState<TABS>(TABS.NOW);
  const isNow = currentTab === TABS.NOW;
  const [activeStage, setActiveStage] = useState(2);
  const [rideLocation, setRideLocation] = useState<RideLocation>({
    pickup: "",
    destination: "",
  });
  const setPickupLocation = (pickupLocation: string) => {
    setRideLocation({ ...rideLocation, pickup: pickupLocation });
  };
  const setDestinationLocation = (destinationLocation: string) => {
    setRideLocation({ ...rideLocation, destination: destinationLocation });
  };
  const hasSelectedLocation = !!activeStage;

  const stages = {
    1: (
      <SelectPaymentType
        goToNextStage={() => setActiveStage(2)}
        goToPreviousStage={() => setActiveStage(0)}
        rideLocation={rideLocation}
      />
    ),
    2: (
      <SelectDriver
        goToNextStage={() => setActiveStage(3)}
        goToPreviousStage={() => setActiveStage(0)}
      />
    ),
  };
  return (
    <SafeAreaView style={[globalUtilStyles.flex1, bgColorStyle.white]}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={[globalUtilStyles.flex1]}>
        {location && (
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={[globalUtilStyles.flex1]}
          />
        )}

        <View
          style={[
            globalUtilStyles.absolute,
            globalUtilStyles.flex1,
            globalUtilStyles.wfull,
            globalUtilStyles.hfull,
            globalUtilStyles.bottom0,
            globalUtilStyles.pt4,
            globalUtilStyles.px4,
            {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
          ]}
        >
          <View
            style={[
              globalUtilStyles.flexRow,
              globalUtilStyles.itemsCenter,
              globalUtilStyles.wfull,
              globalUtilStyles.gap4,
              {
                display: hasSelectedLocation ? "none" : "flex",
              },
            ]}
          >
            <BackButton
              style={[bgColorStyle.white, globalUtilStyles.roundedmd]}
            />
            <View
              style={[
                globalUtilStyles.flexRow,
                globalUtilStyles.flex1,
                bgColorStyle.white,
                {
                  height: scale(30),
                  borderRadius: scale(7),
                },
              ]}
            >
              <Tab
                id={TABS.NOW}
                currentTab={currentTab}
                changeTab={setCurrentTab}
                style={[
                  globalUtilStyles.py2,
                  globalUtilStyles.px4,
                  globalUtilStyles.flex1,
                  globalUtilStyles.itemsCenter,
                ]}
              >
                <CustomText
                  weight={600}
                  size={14}
                  style={[
                    isNow ? textColorStyle.white : textColorStyle.primary,
                  ]}
                >
                  Now
                </CustomText>
              </Tab>
              <Tab
                id={TABS.SCHEDULED}
                currentTab={currentTab}
                changeTab={setCurrentTab}
                style={[
                  globalUtilStyles.py2,
                  globalUtilStyles.px4,
                  globalUtilStyles.flex1,
                  globalUtilStyles.itemsCenter,
                ]}
              >
                <CustomText
                  weight={600}
                  size={14}
                  style={[
                    !isNow ? textColorStyle.white : textColorStyle.primary,
                    globalUtilStyles.textCenter,
                  ]}
                >
                  Scheduled
                </CustomText>
              </Tab>
            </View>
            <CustomPressable
              style={[
                bgColorStyle.white,
                globalUtilStyles.roundedmd,
                {
                  width: scale(30),
                  height: scale(30),
                },
              ]}
            >
              <View />
            </CustomPressable>
          </View>
          {hasSelectedLocation ? (
            <FadeInFadeOutView
              uniqueKey={`order-ride-stage-${activeStage}`}
              collapsable={false}
              style={[globalUtilStyles.flex1]}
            >
              {stages[activeStage as keyof typeof stages]}
            </FadeInFadeOutView>
          ) : (
            <>
              <TabPanel id={TABS.NOW} currentTab={currentTab}>
                <SelectLocation
                  rideLocation={rideLocation}
                  setPickupLocation={setPickupLocation}
                  setDestinationLocation={setDestinationLocation}
                  goToNextStage={() => setActiveStage(1)}
                />
              </TabPanel>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

enum TABS {
  NOW = "now",
  SCHEDULED = "scheduled",
}
export type RideLocation = {
  pickup: string;
  destination: string;
};
