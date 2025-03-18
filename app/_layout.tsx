import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { Provider, useDispatch} from 'react-redux';
import { store } from '@/api/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from '@/api/authSlice';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
      <Provider store={store}>
        <RootLayoutContent />
      </Provider>
  );
}

function RootLayoutContent() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  const dispatch = useDispatch(); // Тепер викликається всередині Provider

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    const loadStoredToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
    };

    loadStoredToken();
  }, [fontsLoaded, dispatch]);

  if (!fontsLoaded) {
    return null;
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}