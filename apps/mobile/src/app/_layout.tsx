import '@/lib/api'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {DarkTheme, ThemeProvider} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {OnboardingProvider} from "@/providers/OnboardingProvider";
import {RootNavigator} from "@/components/navigation/RootNavigator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000
    }
  }
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style='light' />
          <OnboardingProvider>
            <RootNavigator />
          </OnboardingProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
