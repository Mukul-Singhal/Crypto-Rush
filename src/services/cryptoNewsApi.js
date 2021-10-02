// var options = {
//   method: "GET",
//   url: "https://bing-news-search1.p.rapidapi.com/news",
//   params: { safeSearch: "Off", textFormat: "Raw" },
//   headers: {
//     "x-bingapis-sdk": "true",
//     "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
//     "x-rapidapi-key": "738bae2684msh1eb6bceb37330f5p1a14dejsne51935aa04a3",
//   },
// };

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-key": "738bae2684msh1eb6bceb37330f5p1a14dejsne51935aa04a3",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bing-news-search1.p.rapidapi.com",
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
