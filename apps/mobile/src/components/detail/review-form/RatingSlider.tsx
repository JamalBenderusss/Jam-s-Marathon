import * as Haptics from 'expo-haptics'
import {Text, View, StyleSheet} from "react-native";
import {Host, Slider} from '@expo/ui'
import {REVIEW_RATING} from "@app/constants";
import {colors, fontSize, fontWeight, space} from "@app/tokens";

interface Props {
  value: number | null
  onChange: (value: number) => void
}

export function RatingSlider({value, onChange}: Props) {
  const onValueChange = (nextValue: number) => {
    const rating = Math.round(nextValue)
    if(rating === value) return

    void Haptics.selectionAsync()

    onChange(rating)
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.value}>{value ?? '-'}</Text>
        <Text style={styles.max}>{REVIEW_RATING.max}</Text>
      </View>

      <Host style={styles.host}>
        <Slider
          value={value ?? REVIEW_RATING.min}
          min={REVIEW_RATING.min}
          max={REVIEW_RATING.max}
          step={1}
          onValueChange={onValueChange}
        />
      </Host>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {gap: space[4]},
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: space[1]
  },
  value: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    fontVariant: ['tabular-nums']
  },
  max: {
    color: colors.text.muted,
    fontSize: fontSize.lg,
  },
  host: {
    height: 44
  }
})