import Animated, {interpolate, type SharedValue, useAnimatedStyle} from "react-native-reanimated";
import {StyleSheet, View} from "react-native";
import {BlurView} from "expo-blur";


const FADE_DISTANCE = 35

interface Props {
  scrollY: SharedValue<number>
}

export function ScrollBlurBackground({scrollY}: Props) {
  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.get(), [0, FADE_DISTANCE], [0, 1], 'clamp')
  }))

  return (
    <Animated.View
      pointerEvents='none'
      style={[StyleSheet.absoluteFill, blurStyle]}
    >
      <BlurView
        intensity={80}
        tint='systemChromeMaterialDark'
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.overlay} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)'
  }
})