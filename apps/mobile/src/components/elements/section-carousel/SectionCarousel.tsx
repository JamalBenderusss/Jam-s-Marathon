import { ChevronRight } from 'lucide-react-native'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

interface Props {
  title: string
  onPressArrow?: () => void
  children: ReactNode
}

export function SectionCarousel({ title, onPressArrow, children }: Props) {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onPressArrow}
        disabled={!onPressArrow}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        {!!onPressArrow && (
          <ChevronRight
            size={26}
            color={colors.text.primary}
          />
        )}
      </Pressable>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: space[3], marginBottom: space[8] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: space[3],
    marginBottom: space[2]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold
  },
  scroll: { paddingHorizontal: space[3], gap: space[3] }
})
