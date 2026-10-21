import { router, useLocalSearchParams } from 'expo-router'
import {ChevronLeft} from 'lucide-react-native'
import { View, StyleSheet} from 'react-native'

import {useDiscoverFindByKey} from "@app/api";
import {colors, space} from "@app/tokens";
import Animated  from "react-native-reanimated";
import {LinearGradient} from "expo-linear-gradient";
import { FloatingButton, Screen} from "@/components/ui";
import {ReviewsSection, TitleActions, TitleContent} from "@/components/detail";
import {HeroBackdrop, SectionCarousel, TitleCard} from "@/components/elements";
import {useHeroParallax} from "@/hooks";

export default function TitleDetail() {

    const { key } = useLocalSearchParams<{ key: string }>()
    const { data, isPending} = useDiscoverFindByKey(key)

    const {heroHeight, heroStyle, scrollHandler} = useHeroParallax()

    if(isPending || !data || data.status !== 200) return <Screen />

    const title = data.data

  return (
    <Screen edges={[]}>

        <Animated.View
          style={[styles.hero, heroStyle]}
          pointerEvents='none'
        >
          <HeroBackdrop
            coverUrl={title.coverUrl}
            height={heroHeight}
          />
        </Animated.View>

        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >

          <View style={{ height: heroHeight - space[15]}} />

          <View style={styles.body}>
            <LinearGradient
              colors={['transparent', colors.bg.base]}
              style={styles.bodyFade}
              pointerEvents='none'
            />

            <TitleContent title={title}/>

            <TitleActions
              titleKey={title.key}
            />

            {!!title.similar.length && (
              <SectionCarousel title='You may also like'>
                {title.similar.map(item => (
                  <TitleCard
                    key={item.key}
                    title={item}
                    onPress={() => router.push(`/title/${item.key}`)}
                  />
                ))}
              </SectionCarousel>
            )}

            <View style={styles.reviews}>
              <ReviewsSection titleKey={title.key}/>
            </View>
          </View>
      </Animated.ScrollView>

      <FloatingButton
        icon={ChevronLeft}
        side='left'
        iconOffset={-2}
        onPress={router.back}
      />
    </Screen>
  )
}

const styles= StyleSheet.create({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  body: {
    backgroundColor: colors.bg.base,
    paddingBottom: space[6]
  },
  bodyFade: {
    position: 'absolute',
    top: space[10],
    left: 0,
    right: 0,
    height: space[10]
  },
  reviews: {
    marginTop: space[8],
    paddingBottom: space[5],
    paddingHorizontal: space[3]
  }
})
