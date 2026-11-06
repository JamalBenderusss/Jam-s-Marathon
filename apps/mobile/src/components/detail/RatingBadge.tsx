import type {DiscoverDetailsResponseExternalSource} from "@app/api";
import {METACRITIC, METACRITIC_COLORS, RATING_SOURCES} from "@app/constants";
import {GlassBadge} from "@/components/ui";
import {StyleSheet, Text} from "react-native";
import {colors, fontSize, fontWeight} from "@app/tokens";

interface Props {
  source: DiscoverDetailsResponseExternalSource
  rating: number | null
  metacritic: number | null
}

function getMetacriticColor(score: number) {
  if(score >= METACRITIC.goodScore) return METACRITIC_COLORS.good
  if(score >= METACRITIC.mixScore) return METACRITIC_COLORS.mixed

  return METACRITIC_COLORS.bad
}

export function RatingBadge({source, rating, metacritic}: Props) {
  if(metacritic) {
    return (
      <GlassBadge
        size='md'
        style={styles.root}
      >
        <Text
          style={[styles.source, {color: getMetacriticColor(metacritic)}]}
        >
          {METACRITIC.label}
        </Text>
        <Text style={styles.rating}>
            {metacritic}
        <Text style={styles.scale}>/{METACRITIC.scale}</Text>
        </Text>
      </GlassBadge>
    )
  }

  if(!rating) return null

  const { label, color, scale } = RATING_SOURCES[source]

  return (
    <GlassBadge
      size='md'
      style={styles.root}
    >
      <Text style={[styles.source, {color}]}>{label}</Text>
      <Text style={styles.rating}>
        {rating.toFixed(1)}
        <Text style={styles.scale}>/{scale}</Text>
      </Text>
    </GlassBadge>
  )
}

const styles = StyleSheet.create({
  root: {alignSelf: 'flex-start'},
  source: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold
  },
  rating: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold
  },
  scale: {
    color: colors.text.muted,
    fontWeight: fontWeight.medium
  }
})