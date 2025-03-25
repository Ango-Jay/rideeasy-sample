import CustomImage from "@/components/shared/Image";
import { LayoutWithScroll } from "@/components/shared/layouts/LayoutWithScroll";
import CustomText from "@/components/shared/Text";
import globalUtilStyles from "@/styles";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import NotificationIcon from "@/assets/icons/notification.svg";
import CustomPressable from "@/components/shared/buttons/Pressable";
import BalanceDetails from "@/components/shared/utils/BalanceDetails";
import { bgColorStyle } from "@/styles/color";
import CarIcon from "@/assets/icons/car.svg";
import BikeIcon from "@/assets/icons/bike_2.svg";
import DeliveryIcon from "@/assets/icons/bike_1.svg";
import HaulageIcon from "@/assets/icons/truck.svg";
import { router } from "expo-router";

export default function Home() {
  const quickActionsOnPress = (id: number) => {
    switch (id) {
      case 1:
        router.push("/home");
        break;
      case 2:
        router.push("/home");
        break;
      case 3:
        router.push("/home");
        break;
      case 4:
        router.push("/home");
        break;
    }
  };
  return (
    <LayoutWithScroll>
      <View style={[globalUtilStyles.flex1, globalUtilStyles.pb4]}>
        <View
          style={[
            globalUtilStyles.flexRow,
            globalUtilStyles.itemsCenter,
            globalUtilStyles.justifyBetween,
            globalUtilStyles.mb8,
          ]}
        >
          <View style={[globalUtilStyles.gap2]}>
            <View
              style={[
                {
                  width: scale(48),
                  height: scale(48),
                },
                globalUtilStyles.roundedfull,
                globalUtilStyles.overflowHidden,
              ]}
            >
              <CustomImage
                source={require("../../../assets/images/avatar.png")}
                resizeMode="contain"
                style={[globalUtilStyles.wfull, globalUtilStyles.hfull]}
              />
            </View>
            <CustomText>Hello Oluwatobi</CustomText>
          </View>
          <CustomPressable>
            <NotificationIcon />
          </CustomPressable>
        </View>

        <BalanceDetails />

        <View style={[globalUtilStyles.wfull, globalUtilStyles.mt4]}>
          <CustomText size={14} weight={600} style={[globalUtilStyles.mb2]}>
            Activities
          </CustomText>
          <View style={[globalUtilStyles.flexRow, globalUtilStyles.flexWrap]}>
            {quickActions.map((item) => (
              <View
                key={item.id}
                style={[
                  globalUtilStyles.whalf,
                  globalUtilStyles.px3,
                  item.id > 2 && globalUtilStyles.pt2,
                  globalUtilStyles.pb2,
                  {
                    height: scale(160),
                  },
                ]}
              >
                <CustomPressable
                  style={[
                    globalUtilStyles.wfull,
                    globalUtilStyles.hfull,
                    item.bgColorStyle,
                    globalUtilStyles.roundedlg,
                    globalUtilStyles.itemsCenter,
                    globalUtilStyles.justifyCenter,
                    globalUtilStyles.gap2,
                  ]}
                  onPress={() => quickActionsOnPress(item.id)}
                >
                  {item.icon}
                  <CustomText weight={600} size={14}>
                    {item.title}
                  </CustomText>
                </CustomPressable>
              </View>
            ))}
          </View>
        </View>
      </View>
    </LayoutWithScroll>
  );
}

const quickActions = [
  {
    id: 1,
    title: "Ride with Car",
    icon: <CarIcon />,
    bgColorStyle: bgColorStyle.purpleLight,
  },
  {
    id: 2,
    title: "Ride with Bike",
    icon: <BikeIcon />,
    bgColorStyle: bgColorStyle.pinkLight,
  },
  {
    id: 3,
    title: "Delivery",
    icon: <DeliveryIcon />,
    bgColorStyle: bgColorStyle.yellowLight,
  },
  {
    id: 4,
    title: "Haulage",
    icon: <HaulageIcon />,
    bgColorStyle: bgColorStyle.greenLight,
  },
];
