import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'https://api.betterless.today';

export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Login'],
  endpoints: (build) => ({
    signup: build.mutation<any, { email: string, password: string }>({
      query: (SignIn) => ({
        url: '/v1/user/registration',
        method: 'POST',
        body: SignIn,
      }),
    }),
  }),
});
