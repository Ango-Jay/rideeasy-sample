import { useQuery } from "@tanstack/react-query";
import { GET_ADDRESS_LAT_LNG } from "../api/google";

export const useGetAddressLatAndLng = (args: {
  placeId?: string;
  enabled: boolean;
}) => {
  const query = useQuery({
    queryKey: ["getAddressLatAndLng", args.placeId],
    queryFn: () =>
      GET_ADDRESS_LAT_LNG({
        address: args.placeId || "",
      }),
    enabled: args.enabled,
  });
  const response = {
    ...query,
    data: query.data?.data.results?.map((result) => {
      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      };
    })?.[0],
  };
  return response;
};
export default useGetAddressLatAndLng;
