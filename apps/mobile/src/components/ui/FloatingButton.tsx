import type { LucideIcon } from 'lucide-react-native'
import { View,StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { space } from '@app/tokens'
import {GlassIconButton} from "@/components/ui";

interface Props {
  icon: LucideIcon
  accessibilityLabel: string,
  side: 'left' | 'right'
  iconOffset?: number
  onPress: () => void
}

export function FloatingButton({
  icon,
  accessibilityLabel,
  side,
  iconOffset,
  onPress,
}: Props) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.root,
        {top: insets.top + space[2]},
        side === 'left'
          ? { left: space[3]}
          : { right: space[3]}
    ]}>
      <GlassIconButton
        icon={icon}
        accessibilityLabel={accessibilityLabel}
        iconOffset={iconOffset}
        onPress={onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 10,
  }
})
