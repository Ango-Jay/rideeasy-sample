import globalUtilStyles from "@/styles";
import { bgColorStyle } from "@/styles/color";
import { StyleSheet, View } from "react-native";
import { Marker, type LatLng } from "react-native-maps";
import { scale } from "react-native-size-matters";
import type { ReactNode } from "react";

interface Props {
  coordinate: LatLng;
  strokeColor: string;
  children: ReactNode;
}
const CustomMarker = ({
  coordinate,
  strokeColor,
  children,
  ...props
}: Props) => {
  return (
    <Marker coordinate={coordinate}>
      <View
        style={[
          bgColorStyle.white,
          globalUtilStyles.roundedfull,
          globalUtilStyles.itemsCenter,
          globalUtilStyles.justifyCenter,
          styles.container,
        ]}
        {...props}
      >
        <View
          style={[
            globalUtilStyles.roundedfull,
            globalUtilStyles.flex1,
            globalUtilStyles.wfull,
            globalUtilStyles.hfull,
            globalUtilStyles.itemsCenter,
            globalUtilStyles.justifyCenter,
            globalUtilStyles.p1,
            {
              backgroundColor: strokeColor,
            },
          ]}
        >
          <View
            style={[
              bgColorStyle.white,
              globalUtilStyles.roundedfull,
              globalUtilStyles.flex1,
              globalUtilStyles.wfull,
              globalUtilStyles.hfull,
            ]}
          />
        </View>
        {children}
      </View>
    </Marker>
  );
};
const styles = StyleSheet.create({
  container: {
    width: scale(24),
    height: scale(24),
    padding: scale(3),
  },
});
export default CustomMarker;
