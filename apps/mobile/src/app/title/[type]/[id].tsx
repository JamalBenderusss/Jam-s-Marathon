import { router, useLocalSearchParams } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { Pressable, Text, View } from 'react-native'

import { FloatingButton } from '@/components/ui/FloatingButton'
import { Screen } from '@/components/ui/Screen'

export default function TitleDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>()

  return (
    <Screen>
      <FloatingButton
        onPress={() => router.back()}
        side='left'
        icon={ChevronLeft}
        iconOffset={-2}
      />

      <View
        style={{
          marginTop: 60
        }}
      >
        <Text>
          Title {type} {id}
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text>Back</Text>
        </Pressable>
      </View>
    </Screen>
  )
}
