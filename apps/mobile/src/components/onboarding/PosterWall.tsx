import {StyleSheet, useWindowDimensions, View} from "react-native";
import {PosterColumn} from "@/components/onboarding/PosterColumn";
import {LinearGradient} from "expo-linear-gradient";
import {colors, space} from "@app/tokens";

const COLUMNS = 5

interface Props {
  coverUrls: string[]
}

export function PosterWall({coverUrls}: Props) {
  const { width } = useWindowDimensions()

  const posterWidth = width / (COLUMNS - 1)

  const columns = Array.from({ length: COLUMNS}, (_, column) =>
    coverUrls.filter((_,index) => index % COLUMNS === column)
  )

  return (
    <View
      style={styles.root}
      pointerEvents='none'
    >
      <View style={styles.tilt}>
        {columns.map((columnUrls, index) => (
          <PosterColumn
            key={index}
            coverUrls={columnUrls}
            posterWidth={posterWidth}
            isReversed={index % 2 === 1}
          />
        ))}
      </View>

      <LinearGradient
        colors={['transparent', colors.bg.base]}
        locations={[0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  tilt: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: space[2],
    transform: [{ rotate: '-12deg'}, {scale: 1.3 }]
  }
})