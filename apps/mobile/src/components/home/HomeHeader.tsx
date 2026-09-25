import { BlurView } from 'expo-blur'
import { Bell } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

export function HomeHeader({ ScrollY }: { ScrollY: SharedValue<number> }) {
  const insets = useSafeAreaInsets()

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(ScrollY.get(), [0, 35], [0, 1], 'clamp')
  }))

  return (
    <View
      style={styles.root}
      pointerEvents='box-none'
    >
      <Animated.View
        pointerEvents='none'
        style={[StyleSheet.absoluteFill, blurStyle]}
      >
        <BlurView
          intensity={80}
          tint='dark'
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.overlay} />
      </Animated.View>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
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
