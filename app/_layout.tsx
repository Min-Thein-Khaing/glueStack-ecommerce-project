import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';


SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5 ,//default is 3 and then country is poor internet connection use 5 time 
     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
    }
  }
});


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { _hasHydrated } = useAuthStore()

  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);
  if (!_hasHydrated) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(verify)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}


