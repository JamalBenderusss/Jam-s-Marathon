import type { LucideIcon } from "lucide-react-native"
import {colors} from "@app/tokens";
import {Pressable, StyleSheet} from "react-native";
import {GlassBadge} from "@/components/ui/GlassBadge";

interface Props {
  icon: LucideIcon
  accessibilityLabel: string
  iconOffset?: number
  onPress: () => void
  tintColor?: string
}

export function GlassIconButton({
  icon: Icon,
  accessibilityLabel,
  iconOffset,
  onPress,
  tintColor
}: Props) {

  return (
    <GlassBadge size='lg' tintColor={tintColor}>
      <Pressable
        onPress={onPress}
        hitSlop={12}
        accessibilityRole='button'
        accessibilityLabel={accessibilityLabel}
        style={styles.press}
      >
        <Icon
          size={24}
          color={colors.text.primary}
          style={iconOffset ? {marginLeft: iconOffset} : undefined}
        />
      </Pressable>
    </GlassBadge>
  )
}

const styles = StyleSheet.create({
  press: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
