import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
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

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders, // Додаємо токен до заголовка
    }),
    tagTypes: ['Auth', 'User'],
    endpoints: (build) => ({
        signup: build.mutation<any, { email: string, password: string }>({
            query: (body) => ({
                url: '/v1/user/registration',
                method: 'POST',
                body,
            }),
        }),
        login: build.mutation<any, { email: string, password: string }>({
            query: (body) => ({
                url: '/v1/user/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

// Експортуємо хук для використання в компонентах
export const { useSignupMutation, useLoginMutation } = loginAPI;

// export const loginAPI = createApi({
//     reducerPath: 'loginAPI',
//     baseQuery: fetchBaseQuery({baseUrl: API_URL}),
//     tagTypes: ['Login'],
//     endpoints: (build) => ({
//         signup: build.mutation<any, { email: string, password: string }>({
//             query: (SignIn) => ({
//                 url: '/v1/user/registration',
//                 method: 'POST',
//                 body: SignIn,
//             }),
//         }),
//     }),
// });


