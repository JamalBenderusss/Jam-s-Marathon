import {colors, fontSize, fontWeight, space} from "@app/tokens";
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {PLANS} from "@/components/plans/plans.data";
import {FloatingButton} from "@/components/ui";
import {router} from "expo-router";
import {PlanCard} from "@/components/plans/PlanCard";
import {X} from "lucide-react-native";


const CARD_PEEK = space[8]

export default function Plans() {
  const {width} = useWindowDimensions()
  const {top} = useSafeAreaInsets()

  const cardWidth = width - CARD_PEEK * 2

  return (
    <View style={styles.root}>
      <View style={[styles.content, {paddingTop: top + space[10]}]}>
        <Text style={styles.title}>Choose your plan</Text>

        <ScrollView
          horizontal
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + space[3]}
          decelerationRate='fast'
          contentContainerStyle={styles.cards}
        >
          {PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              width={cardWidth}
              onPress={() => {}}
            />
          ))}
        </ScrollView>
      </View>

      <FloatingButton
          icon={X}
          side='left'
          onPress={() => router.back()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base
  },
  content: {
    flex: 1,
    gap: space[8]
  },
  carousel: {
    flexGrow: 0
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  cards: {
    alignItems: 'flex-start',
    gap: space[3],
    paddingHorizontal: CARD_PEEK
  }
})