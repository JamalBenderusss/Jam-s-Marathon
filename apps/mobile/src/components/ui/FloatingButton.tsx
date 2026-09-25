import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import type { LucideIcon } from 'lucide-react-native'
import { Pressable, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, radius, space } from '@app/tokens'

interface Props {
  icon: LucideIcon
  onPress: () => void
  side: 'left' | 'right'
  iconOffset?: number
}

export function FloatingButton({
  icon: Icon,
  onPress,
  side,
  iconOffset
}: Props) {
  const insets = useSafeAreaInsets()

  const position = [
    styles.root,
    { top: insets.top + 8 },
    side === 'left' ? { left: space[3] } : { right: space[3] }
  ]

  const content = (
    <Icon
      size={26}
      color={colors.text.primary}
      style={iconOffset ? { marginLeft: iconOffset } : undefined}
    />
  )

  if (!isGlassEffectAPIAvailable()) {
    return (
      <Pressable
        onPress={onPress}
        style={[position, styles.fallback]}
        hitSlop={12}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={position}>
      <GlassView
        style={styles.glass}
        glassEffectStyle='clear'
        isInteractive
      >
        <Pressable
          onPress={onPress}
          style={styles.press}
          hitSlop={12}
        >
          {content}
        </Pressable>
      </GlassView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  glass: {
    flex: 1,
    borderRadius: radius.full
  },
  press: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
})
