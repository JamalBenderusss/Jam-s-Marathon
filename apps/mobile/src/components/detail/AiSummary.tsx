import {useAuth} from "@/hooks";
import {useAiTitleSummary} from "@app/api";
import {StyleSheet, Text, View} from "react-native";
import {Sparkles} from "lucide-react-native";
import {colors, fontSize, fontWeight, radius, space} from "@app/tokens";

interface Props {
  titleKey: string
}

const SKELETON_WIDTHS = ['100%', '80%', '60%'] as const

export function AiSummary({titleKey}: Props) {
  const {isAuthorized} = useAuth()

  const { data, isError, isPending } = useAiTitleSummary(titleKey, {
    query: {
      enabled: isAuthorized,
      staleTime: Infinity
    }
  })

  const summary = data?.status === 200 ? data.data.summary : null

  if(!isAuthorized || isError || (!isPending && !summary)) return null

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Sparkles
          size={16}
          color={colors.selected}
        />
        <Text style={styles.label}>AI summary</Text>
      </View>

      {isPending ? (
        SKELETON_WIDTHS.map((width) => (
          <View
            key={width}
            style={[styles.skeleton, {width}]}
          />
          ))
      ) : (
        <Text style={styles.text}>{summary}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: space[2],
    marginTop: space[6],
    padding: space[4],
    borderRadius: radius.lg,
    backgroundColor: colors.bg.card
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  },
  label: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold
  },
  text:{
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.5
  },
  skeleton: {
    height: fontSize.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.bg.card
  }
})