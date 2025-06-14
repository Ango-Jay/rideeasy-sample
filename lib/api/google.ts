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
        "X-Goog-Api-Key": process.env.MAP_KEY,
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
        key: process.env.MAP_KEY,
      },
    },
  );
};

export const GET_ROUTE_DETAILS = async (data: {
  originLatAndLng: {
    latitude: number;
    longitude: number;
  };
  destinationLatAndLng: {
    latitude: number;
    longitude: number;
  };
  travelMode: "DRIVE";
}) => {
  return await googleApi.post<GetRouteDetailsResponse>(
    "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix",
    {
      origins: [
        {
          waypoint: {
            location: {
              latLng: data.originLatAndLng,
            },
          },
        },
      ],
      destinations: [
        {
          waypoint: {
            location: {
              latLng: data.destinationLatAndLng,
            },
          },
        },
      ],
      travelMode: data.travelMode,
    },
    {
      headers: {
        "X-Goog-Api-Key": process.env.MAP_KEY,
        "X-Goog-FieldMask": "duration",
      },
    },
  );
};

// googleApi.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2))
//   return request
// })

type GetRouteDetailsResponse = {
  status: string;
  duration: string;
}[];
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
