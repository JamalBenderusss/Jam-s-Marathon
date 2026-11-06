import type {CollectionListItemResponse} from "@app/api";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {router} from "expo-router";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {colors, fontSize, fontWeight, radius, space} from "@app/tokens";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const COVER_ASPECT_RATIO = 1.4
const STACK_OFFSET = 12
const STACK_LIFT = 4
const PRESSED_SCALE = 0.97

interface Props {
  collection: CollectionListItemResponse
  width: number
}

export function CollectionCard({ collection, width}: Props) {
  const {id, name, previewCovers } = collection
  const [mainCover, middleCover, backCover] = previewCovers

  const coverHeight = width * COVER_ASPECT_RATIO
  const pressed = useSharedValue(0)

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -pressed.get() * (1 - PRESSED_SCALE) }]
  }))

  const middleLayerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -pressed.get() * STACK_LIFT }]
  }))

  const backLayerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -pressed.get() * STACK_LIFT * 2 }]
  }))

  return (
    <AnimatedPressable
      onPress={() => router.push(`/collections/${id}`)}
      onPressIn={() => pressed.set(withSpring(1))}
      onPressOut={() => pressed.set(withSpring(0))}
      accessibilityRole='button'
      accessibilityLabel={name}
      style={[styles.root, {width}, cardStyle]}
    >
      <View style={{height: coverHeight + STACK_OFFSET }}>
        <Animated.View
          style={[
            styles.layer,
            styles.backLayer,
            { height: coverHeight },
            backLayerStyle
          ]}
        >
          <Image
            source={backCover ?? null}
            contentFit='cover'
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.layer,
            styles.middleLayer,
            { height: coverHeight },
            middleLayerStyle
          ]}
        >
          <Image
            source={middleCover ?? null}
            contentFit='cover'
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View style={[styles.layer, styles.mainLayer, { height: coverHeight }]}>
          <Image
              source={mainCover ?? null}
              contentFit='cover'
              transition={200}
              style={StyleSheet.absoluteFill}
          />
        </View>
      </View>

      <Text
        style={styles.name}
        numberOfLines={1}
      >
        {name}
      </Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  root: { gap: space[1]},
  layer: {
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: radius.lg,
    backgroundColor: colors.bg.card
  },
  backLayer: {
    top: 0,
    left: space[4],
    right: space[4],
    opacity: 0.35
  },
  middleLayer: {
    top: STACK_OFFSET / 2,
    left: space[2],
    right: space[2],
    opacity: 0.6
  },
  mainLayer: {
    top: STACK_OFFSET,
    left: 0,
    right: 0,
  },
  name: {
    marginTop: space[1],
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold
  }
})