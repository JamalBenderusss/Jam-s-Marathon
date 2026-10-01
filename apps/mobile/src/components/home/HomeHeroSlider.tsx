import { LinearGradient } from 'expo-linear-gradient'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import type {DiscoverItemResponse } from '@app/api'

import { PaginationDot } from '@/components/home/PaginationDot'
import { Button } from '@/components/ui/button'
import {HomeHeroSlide} from "@/components/home/HomeHeroSlide";
import {TitleInfo} from "@/components/hero/TitleInfo";
import {router} from "expo-router";
import {HERO_GRADIENT} from "@/components/hero/HeroBackdrop";

interface Props {
  items: DiscoverItemResponse[]
}

export function HomeHeroSlider({ items }: Props) {
  const { width } = useWindowDimensions()
  const [index, setIndex] = useState(0)

  const ScrollX = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e => {
    ScrollX.set(e.contentOffset.x)
  })

  const height = width * 1.4
  const current = items[index]

  return (
    <View style={{ height }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={e => {
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }}
        style={StyleSheet.absoluteFill}
      >
        {items.map((item, i) => (
          <HomeHeroSlide
            key={item.key}
            item={item}
            index={i}
            width={width}
            height={height}
            scrollX={ScrollX}
          />
        ))}
      </Animated.ScrollView>
      <LinearGradient
        colors={HERO_GRADIENT.colors}
        locations={HERO_GRADIENT.locations}
        style={StyleSheet.absoluteFill}
        pointerEvents='none'
      />
      <Animated.View
        style={styles.content}
        pointerEvents='box-none'
      >
        <Animated.View
          key={current?.key}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(200)}
          style={{ gap: space[2] }}
          pointerEvents='none'
        >
          <TitleInfo
            name={current?.name || ''}
            meta={current?.genres.slice(0,3).join(' - ')}
            description='Когда ты ставишь StyleSheet.absoluteFill, ScrollView растягивается
            на весь родительский View.'
          />

        </Animated.View>

        <View
          style={styles.bottom}
          pointerEvents='box-none'
        >
          <View style={styles.actions}>
            <Button
              icon={Play}
              onPress={() => {
                router.push(`/title/${current?.key}`)
              }}
            >
              Watch Movie
            </Button>

            <Button
              icon={Plus}
              onPress={() => {}}
              variant='secondary'
            />
          </View>

          <View style={styles.dots}>
            {items.map((item, i) => {
              return (
                <PaginationDot
                  key={item.key}
                  index={i}
                  width={width}
                  scrollX={ScrollX}
                />
              )
            })}
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space[3],
    paddingBottom: space[4],
    gap: space[2]
  },
  genres: {
    color: colors.text.primary,
    fontSize: fontSize.sm
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold
  },
  description: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    lineHeight: 20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: space[3]
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: space[3] },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  }
})
