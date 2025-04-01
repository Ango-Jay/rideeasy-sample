import * as Location from "expo-location";
import { useState } from "react";

const usePermissions = () => {
  const useLocationPermission = () => {
    const [permissionStatus, setPermissionStatus] = useState<Status>();
    const checkLocationPermission = async (args?: args) => {
      try {
        setPermissionStatus("loading");
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          setPermissionStatus("error");
          args?.onError?.();
        } else {
          setPermissionStatus("succcess");
          args?.onSuccess?.();
        }
      } catch {
        setPermissionStatus("error");
        args?.onError?.();
      }
    };
    const requestLocationPermission = async (args?: args) => {
      try {
        setPermissionStatus("loading");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setPermissionStatus("error");
          args?.onError?.();
        } else {
          setPermissionStatus("succcess");
          args?.onSuccess?.();
        }
      } catch {
        setPermissionStatus("error");
      }
    };
    return {
      permissionStatus,
      requestLocationPermission,
      checkLocationPermission,
    };
  };

  return {
    useLocationPermission,
  };
};
type Status = "loading" | "succcess" | "error";
type args =
  | {
      onSuccess?: () => void;
      onError?: () => void;
    }
  | undefined;
export default usePermissions;
