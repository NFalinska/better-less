import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'https://api.betterless.today';

// Функція для отримання токена з localStorage
const prepareHeaders = async (headers) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders,
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/v1/user/logout',
                method: 'POST',
            }),
        }),
        getProfile: build.query<any, void>({
            query: () => ({
                url: '/v1/user/profile',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        uploadPhoto: build.mutation<any, FormData>({
            query: (formData) => ({
                url: '/v1/user/upload-photo',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

// Експортуємо хук для використання в компонентах
export const {
    useLogoutMutation,
    useGetProfileQuery,
    useUploadPhotoMutation
} = userAPI;
