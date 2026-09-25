import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

interface Props {
  children: string
  actions?: ReactNode
}

export function ScreenTitle({ children, actions }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{children}</Text>
      {actions}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: space[4]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold
  }
})
