import { StyleSheet, Text } from 'react-native'

import { colors, fontSize, space } from '@app/tokens'

import { Screen } from '@/components/ui/Screen'
import { ScreenTitle } from '@/components/ui/ScreenTitle'

export default function Library() {
  return (
    <Screen>
      <ScreenTitle>Library</ScreenTitle>
    </Screen>
  )
}

const styles = StyleSheet.create({
  item: {
    color: colors.text.primary,
    fontSize: fontSize.base,
    paddingVertical: space[3]
  }
})
