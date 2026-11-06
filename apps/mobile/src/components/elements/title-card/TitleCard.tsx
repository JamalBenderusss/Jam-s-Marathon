import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { colors, radius, space } from '@app/tokens'

import type {DiscoverItemResponse} from '@app/api'

import { CARD_CONFIG } from '@/components/elements/title-card/config'
import type {ReactNode} from "react";
import { GlassBadge } from "@/components/ui"

interface Props {
  title: Pick<DiscoverItemResponse, 'coverUrl' | 'type'>
  onPress: () => void
  badge?: ReactNode
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function TitleCard({ title, onPress, badge }: Props) {
  const config = CARD_CONFIG[title.type]

  const scale = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const HandlePressIn = () => {
    scale.set(withSpring(0.95))
  }

  const HandlePressOut = () => {
    scale.set(withSpring(1))
  }

  return (
    <View
      style={{
        width: 108, //+9
        height: 171
      }}
    >
      {config.stacked && (
        <>
          <View
            style={[
              styles.stack,
              {
                borderRadius: config.radius,
                top: -3,
                left: 4,
                right: 4,
                opacity: 0.45
              }
            ]}
          ></View>
        </>
      )}
      <AnimatedPressable
        onPress={onPress}
        onPressIn={HandlePressIn}
        onPressOut={HandlePressOut}
        style={[
          styles.card,
          animated,
          {
            borderRadius: config.radius,
            borderWidth: config.glow ? 1 : 0,
            borderColor: config.glow ?? 'transparent'
          }
        ]}
      >
        <Image
          source={title.coverUrl}
          style={StyleSheet.absoluteFill}
          contentFit='cover'
          transition={200}
        />
        {config.spine && (
          <>
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.65)',
                'rgba(255,255,255,0.12)',
                'transparent'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.spine}
            />
            <View style={styles.pages} />
          </>
        )}

        <View style={[styles.badge, styles.badgeLeft, ]}>
          <GlassBadge
            size='sm'
          >
            <config.icon
              size={13}
              color={colors.text.primary}
              strokeWidth={2.2}
            />
          </GlassBadge>
        </View>

        {!!badge && (
          <View style={[styles.badge, styles.badgeRight]}>
            <GlassBadge
              size='sm'
            >
              {badge}
            </GlassBadge>
          </View>
        )}
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.bg.card
  },
  stack: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.bg.elevated,
    borderWidth: 2,
    borderColor: colors.border
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10
  },
  pages: {
    position: 'absolute',
    right: 0,
    top: 4,
    bottom: 4,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.18)'
  },
  badge: {
    position: 'absolute',
    bottom: space[2],
    borderRadius: radius.full,
  },
  glass: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  badgeLeft: { left: space[2]},
  badgeRight: { right: space[2]},
  fallback: {
    backgroundColor: 'rgba(0,0,0,0.45)'
  }
})
