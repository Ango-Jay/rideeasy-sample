import globalUtilStyles from "@/styles";
import { bgColorStyle, textColorStyle } from "@/styles/color";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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
import DriverAccept from "@/components/RideOrder/DriverAccept";
import { IsIOS, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants";
import useGetAddressLatAndLng from "@/lib/queries/useGetAddressLatAndLng";
import { MapViewRoute } from "react-native-maps-routes";
import { appColors } from "@/constants/Colors";
import CustomMarker from "@/components/shared/utils/CustomMarker";

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
  const [activeStage, setActiveStage] = useState(0);
  const [pickup, setPickup] = useState({
    address: "",
    placeId: "",
  });
  const [destination, setDestination] = useState({
    address: "",
    placeId: "",
  });
  const setPickupLocation = (value: string, field: "placeId" | "address") => {
    setPickup((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const setDestinationLocation = (
    value: string,
    field: "placeId" | "address",
  ) => {
    setDestination((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const rideLocationAdress = {
    pickup: pickup.address,
    destination: destination.address,
  };
  const { data: pickupLocationLatAndLn, isFetching: isPickupFetching } =
    useGetAddressLatAndLng({
      placeId: pickup.placeId,
      enabled: activeStage === 1,
    });
  const { data: destinationLatAndLng, isFetching: isDestinationFetching } =
    useGetAddressLatAndLng({
      placeId: destination.placeId,
      enabled: activeStage === 1 && !!pickupLocationLatAndLn,
    });
  const pcikupCords = {
    latitude: pickupLocationLatAndLn?.latitude || 0,
    longitude: pickupLocationLatAndLn?.longitude || 0,
  };
  const destinationCords = {
    latitude: destinationLatAndLng?.latitude || 0,
    longitude: destinationLatAndLng?.longitude || 0,
  };
  // const isFetching = isPickupFetching || isDestinationFetching; TODO use for spinner
  const hasSelectedLocation = activeStage >= 1;
  const hasSelectedDriver = activeStage === 3;
  const stages = {
    1: (
      <SelectPaymentType
        goToNextStage={() => setActiveStage(2)}
        goToPreviousStage={() => setActiveStage(0)}
        rideLocation={rideLocationAdress}
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
            provider={!IsIOS ? PROVIDER_GOOGLE : undefined}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={[
              globalUtilStyles.flex1,
              {
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
              },
            ]}
          >
            <CustomMarker
              coordinate={pcikupCords}
              strokeColor={appColors.amber}
            />
            <CustomMarker
              coordinate={destinationCords}
              strokeColor={appColors.primary}
            />
            {pickupLocationLatAndLn && destinationLatAndLng && (
              <MapViewRoute
                origin={pcikupCords}
                destination={destinationCords}
                apiKey={"AIzaSyBBwjj4vULZXlcU28afHjgYUEq5hafXt04"}
                strokeColor={appColors.amber}
                mode="DRIVE"
              />
            )}
          </MapView>
        )}

        {hasSelectedDriver ? (
          <DriverAccept goToPreviousStage={() => setActiveStage(2)} />
        ) : (
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
                    rideLocation={rideLocationAdress}
                    setPickupLocation={setPickupLocation}
                    setDestinationLocation={setDestinationLocation}
                    goToNextStage={() => setActiveStage(1)}
                  />
                </TabPanel>
              </>
            )}
          </View>
        )}
      </View>
      {}
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
