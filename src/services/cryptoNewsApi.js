import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-Api-Key": "05af28ea93834eccb69052254f938f2f",
};

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        `everything/?q=${newsCategory}&apiKey=${cryptoNewsHeaders["X-Api-Key"]}&pageSize=${count}`,
      header: cryptoNewsHeaders,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
