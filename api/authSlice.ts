import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            if (action.payload) {
                AsyncStorage.setItem("token", action.payload);
            } else {
                AsyncStorage.removeItem("token");
            }
        },
        loadToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            AsyncStorage.removeItem("token");
        },
    },
});

export const { setToken, loadToken, logout } = authSlice.actions;
export default authSlice.reducer;
