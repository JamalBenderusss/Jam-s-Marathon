import {colors} from "@app/tokens";
import {useOnboarding} from "@/providers/OnboardingProvider";
import {Stack} from "expo-router";


const SHEET_OPTIONS = {
  presentation: 'card' as const,
  sheetAllowedDetents: [0, 0.6],
  sheetGrabberVisible: true,
  contentStyle: {backgroundColor: colors.bg.base}
}

export function RootNavigator() {
  const { isCompleted } = useOnboarding()


  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Protected guard={!isCompleted}>
        <Stack.Screen name='onboarding' />
      </Stack.Protected>

      <Stack.Protected guard={isCompleted}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen
          name='plans'
          options={{presentation: 'fullScreenModal'}}
        />
      </Stack.Protected>

      <Stack.Screen
        name='share/[key]'
        options={SHEET_OPTIONS}
      />
      <Stack.Screen
        name='review/[key]'
        options={SHEET_OPTIONS}
      />
    </Stack>
  )
}