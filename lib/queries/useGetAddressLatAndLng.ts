import { useQuery } from "@tanstack/react-query";
import { GET_ADDRESS_LAT_LNG } from "../api/google";

export const useGetAddressLatAndLng = (args: { address?: string }) => {
  const query = useQuery({
    queryKey: ["getAddressLatAndLng"],
    queryFn: () =>
      GET_ADDRESS_LAT_LNG({
        address: args.address || "",
      }),
    enabled: !!args.address,
  });

  return {
    ...query,
    data: {},
  };
};
export default useGetAddressLatAndLng;
