import axios from "axios";

export const googleApi = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const GET_POSSIBLE_ADDRESS_MATCHES = async (data: {
  address: string;
}) => {
  return await googleApi.post<GetPossibleAddressMatchesDataResponse>(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      input: data.address,
      locationBias: {
        /* limit range of options presented */
        circle: {
          center: {
            latitude: 37.7937,
            longitude: -122.3965,
          },
          radius: 500.0,
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyBBwjj4vULZXlcU28afHjgYUEq5hafXt04",
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
      },
    },
  );
};
type GetPossibleAddressMatchesDataResponse = {
  suggestions: [
    {
      placePrediction: {
        placeId: string;
        text: {
          text: string;
          matches: {
            endOffset: number;
          }[];
        };
      };
    },
  ];
};
export const GET_ADDRESS_LAT_LNG = async (queryParams: { address: string }) => {
  return await googleApi.get<GetAddressLatAndLngDataResponse>(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        place_id: queryParams.address,
        region: "ng",
        key: "AIzaSyBBwjj4vULZXlcU28afHjgYUEq5hafXt04",
      },
    },
  );
};
// googleApi.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2))
//   return request
// })
type GetAddressLatAndLngDataResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
    };
    place_id: string;
    status:
      | "OK"
      | "OVER_DAILY_LIMIT"
      | "ZERO_RESULTS"
      | "REQUEST_DENIED"
      | "UNKNOWN_ERROR"
      | "INVALID_REQUEST";
  }[];
};
