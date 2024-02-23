// Make reference to "https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "api.coinranking.com/v2",
  "x-rapidapi-key":
    "coinrankinga7f422d40bfd2655b4657eb726d5197d17d766bc2c7fa919",
};

// This is our api
export const cryptoApi = createApi({
  reducerPath: "cryptoApi", // what the reducer is for (in this case, "cryptoApi")
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coinranking.com/v2/" }),
  endpoints: (builder) => ({
    // Each key is the name of an endpoint
    getCryptos: builder.query({
      // "count" is coming from the argument passed to "useGetCryptosQuery" in Cryptocurrencies.jsx
      // It has just 2 values "10" if "simplified" is true and "100" if it isn't
      // NB: "query" here is basically same as "useGetCryptosQuery" that is being exported.
      // It(query) takes in count as a parameter and (useGetCryptosQuery) has to take in a paramater of "number" type as an argument when being called in any component
      // So, this is the "useGetCryptosQuery" function definition

      // I'm using the "Get list of coins" endpoint
      query: (count) => {
        return {
          url: `coins?limit=${count}`,
          header: cryptoApiHeaders,
        };
      },
    }),
    // I'm using the "Get coin details" endpoint
    getCryptoDetails: builder.query({
      query: (coinId) => {
        return {
          url: `coin/${coinId}`,
          header: cryptoApiHeaders,
        };
      },
    }),
    // I'm using the "Get coin price history" endpoint
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) => {
        return {
          url: `coin/${coinId}/history?timePeriod=${timePeriod}`,
          header: cryptoApiHeaders,
        };
      },
    }),
  }),
});

// useGetCryptosQuery is the hook for making api requests...
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
