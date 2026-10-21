import {STATUS_LABELS} from "@app/constants";
import type {TLibraryStatus} from "@app/types";
import {Pressable, ScrollView, StyleSheet, Text} from "react-native";
import {colors, fontSize, fontWeight, radius, space} from "@app/tokens";
import {Bookmark, Check, LayoutGrid, type LucideIcon, Pause, Play, X} from "lucide-react-native";

const STATUSES = [
    null,
    ...Object.keys(STATUS_LABELS)
] as (TLibraryStatus | null)[]
const STATUS_ICONS: Record<TLibraryStatus, LucideIcon> = {
  PLANNED: Bookmark,
  IN_PROGRESS: Play,
  COMPLETED: Check,
  ON_HOLD: Pause,
  DROPPED: X
}

const ALL_ICON = LayoutGrid

interface Props {
  value: TLibraryStatus | null
  onChange: (status: TLibraryStatus | null) => void
}

export function StatusFilter({value, onChange}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.content}
    >
      {STATUSES.map(status => {
        const isActive = status === value
        const Icon = status ? STATUS_ICONS[status] : ALL_ICON
        const contentColor = isActive
          ? colors.text.secondary
          : colors.text.primary


        return (
          <Pressable
            key={status ?? 'ALL'}
            onPress={() => onChange(status)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Icon
              size={16}
              color={contentColor}
            />
            <Text style={[styles.label, {color: contentColor}]}>
              {status ? STATUS_LABELS[status] : 'ALL'}
            </Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: { flexGrow: 0, marginBottom: space[2]},
  content: {
    gap: space[2],
    paddingHorizontal: space[3]
  },
  chip: {
    height: 36,
    marginBottom: space[2],
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    paddingHorizontal: space[4],
    borderRadius: radius.full,
    backgroundColor: colors.bg.card
  },
  chipActive: { backgroundColor: colors.primary},
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight. medium
  }
})