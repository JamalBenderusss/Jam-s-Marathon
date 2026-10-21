import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { space } from '@app/tokens'

import { useDiscoverGetTrending} from '@app/api'

import { Screen } from '@/components/ui/Screen'
import {router} from "expo-router";
import {HomeHeroSlider} from "@/components/home/HomeHeroSlider";
import {HomeHeader} from "@/components/home/HomeHeader";
import {SectionCarousel, TitleCard} from "@/components/elements";

export default function Index() {
  const scrollY = useSharedValue(0)

  const {data} = useDiscoverGetTrending({take: 20})

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const items = data?.data ?? []
  const heroItems = items.slice(0, 5)
  const trendingItems = items.slice(5, 12)
  const topPickForYouItems = items.slice(12, 20)

  return (
    <Screen edges={[]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: space[15]}}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {!!heroItems.length && <HomeHeroSlider items={heroItems}/>}

        <SectionCarousel
            title='Top picks for you <3'
            onPressArrow={() => {
            }}
        >
          {topPickForYouItems.map(title => (
              <TitleCard
                  onPress={() => router.push(`/title/${title.key}`)}
                    key={title.key}
                    title={title}
                />
            ))}
          </SectionCarousel>
          <SectionCarousel
              title='Popular now'
              onPressArrow={() => {
              }}
          >
            {trendingItems.map(title => (
                <TitleCard
                    onPress={() => router.push(`/title/${title.key}`)}
                    key={title.key}
                    title={title}
                />
            ))}
          </SectionCarousel>
        </Animated.ScrollView>
        <HomeHeader ScrollY={scrollY}/>
      </Screen>
  )
}

// const styles = StyleSheet.create({})
