import { Bell } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, fontSize, fontWeight, space } from '@app/tokens'
import {ScrollBlurBackground} from "@/components/ui";
import type {SharedValue} from "react-native-reanimated";

interface Props {
  scrollY: SharedValue<number>
}

export function HomeHeader({ scrollY }: Props) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={styles.root}
      pointerEvents='box-none'
    >
      <ScrollBlurBackground scrollY={scrollY} />

      <View style={[styles.inner, { paddingTop: insets.top }]}>
        <Text style={styles.logo}>Jam`s Marathon</Text>

        <Pressable hitSlop={12}>
          <Bell color={colors.text.primary} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    paddingTop: space[2]
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space[3],
    paddingBottom: space[4]
  },
  logo: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0,0,0,0.25)'
  }
})
