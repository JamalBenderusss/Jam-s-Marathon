import type {LibraryEntryResponse} from "@app/api";
import {StyleSheet, Text} from "react-native";
import {Star} from "lucide-react-native";
import {colors, fontSize, fontWeight, space} from "@app/tokens";
import {PosterCard} from "@/components/detail";


interface Props {
  entry: LibraryEntryResponse
  width: number
}

export function LibraryCard({entry, width}: Props) {
  return (
    <PosterCard
      title={entry.title}
      width={width}
      badge={
          !!entry.rating && (
            <>
              <Star
                size={12}
                color={colors.text.primary}
                fill={colors.text.primary}
              />
              <Text style={styles.rating}>{entry.rating}</Text>
            </>
            )
        }
      />
  )
}

const styles = StyleSheet.create({
  root: { gap: space[1]},
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.text.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold
  }
})