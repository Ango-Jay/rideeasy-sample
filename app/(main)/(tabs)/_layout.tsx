import CustomText from "@/components/shared/Text";
import { appColors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import HomeIcon from "@/assets/icons/home.svg";
import WalletIcon from "@/assets/icons/wallet.svg";
import SupportIcon from "@/assets/icons/support.svg";

const TabText = ({ color, title }: { color: string; title: string }) => {
  return (
    <CustomText size={12} style={[{ color }]}>
      {title}
    </CustomText>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [tabBarStyle.tabStyle],
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.gray,
      }}
    >
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <WalletIcon fill={focused ? appColors.primary : appColors.gray} />
            );
          },
          tabBarLabel: ({ color }) => <TabText title="Wallet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <HomeIcon fill={focused ? appColors.primary : appColors.gray} />
            );
          },
          tabBarLabel: ({ color }) => <TabText title="Home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SupportIcon
                stroke={focused ? appColors.primary : appColors.gray}
                fill={focused ? appColors.primary : appColors.gray}
              />
            );
          },
          tabBarLabel: ({ color }) => <TabText title="Support" color={color} />,
        }}
      />
    </Tabs>
  );
};
const tabBarStyle = StyleSheet.create({
  iconsize: {
    width: scale(42),
    height: scale(42),
  },
  tabStyle: {
    paddingTop: 0,
    height: scale(55),
    alignItems: "center",
    marginTop: 0,
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    fontWeight: "bold",
  },
});

export default TabLayout;
