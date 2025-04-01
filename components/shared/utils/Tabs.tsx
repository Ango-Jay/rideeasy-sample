import type { ReactNode, Dispatch, SetStateAction } from "react";
import CustomPressable from "../buttons/Pressable";
import { type ViewStyle, type StyleProp } from "react-native";
import { MotiView } from "moti";
import { LinearTransition } from "react-native-reanimated";
import { appColors } from "@/constants/Colors";
import { scale } from "react-native-size-matters";
import globalUtilStyles from "@/styles";

interface TabProps {
  id: string;
  currentTab: string;
  changeTab: Dispatch<SetStateAction<any>>;
  style: StyleProp<ViewStyle>;
  children: ReactNode;
}

const Tab = ({ id, children, changeTab, currentTab, style }: TabProps) => {
  const isActive = id === currentTab;

  return (
    <MotiView
      style={[globalUtilStyles.flex1]}
      animate={{
        backgroundColor: isActive ? appColors.primary : appColors.white,
        borderRadius: scale(7),
      }}
      layout={LinearTransition.springify().damping(10).stiffness(200)}
    >
      <CustomPressable style={[style]} onPress={() => changeTab(id)}>
        {children}
      </CustomPressable>
    </MotiView>
  );
};

interface TabPanelProps {
  id: string;
  currentTab: string;
  children: ReactNode;
}

const TabPanel = ({ id, currentTab, children }: TabPanelProps) => {
  return <>{id === currentTab && children}</>;
};

export { Tab, TabPanel };
