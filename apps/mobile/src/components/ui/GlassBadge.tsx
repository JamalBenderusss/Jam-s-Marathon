import type {ReactNode} from "react";
import {GlassView, isGlassEffectAPIAvailable} from "expo-glass-effect";
import {type StyleProp, StyleSheet, View, type ViewStyle} from "react-native";
import {radius, space} from "@app/tokens";


interface Props {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  tintColor?: string
  glassEffectStyle?: 'regular' | 'clear'
  style?: StyleProp<ViewStyle>
}

const FALLBACK_COLOR = 'rgba(0,0,0,0.45)'

export function GlassBadge({
  children,
  size='md',
  tintColor,
  glassEffectStyle,
  style: propStyle
}: Props) {
  const style = [styles.root, size === 'lg' ? styles.lg : size === 'md' ? styles.md :  styles.sm]

  if (isGlassEffectAPIAvailable()) {
    return (
      <GlassView
        style={[style, propStyle]}
        tintColor={tintColor}
        glassEffectStyle={glassEffectStyle ?? (tintColor ? 'regular' : 'clear')}
        isInteractive
      >
        {children}
      </GlassView>
    )
  }

  return (
    <View style={[
      style,
      {backgroundColor: tintColor ?? FALLBACK_COLOR},
      propStyle
    ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  sm: {
    minWidth: 26,
    height: 26,
    gap: space[1],
    paddingHorizontal: space[1]
  },
  md: {
    height: 36,
    gap: space[2],
    paddingHorizontal: space[4]
  },
  lg: {
    height: 40,
    width: 40
  }
})