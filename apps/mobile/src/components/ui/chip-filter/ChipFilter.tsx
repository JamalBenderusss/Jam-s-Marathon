import {Pressable, ScrollView, StyleSheet, Text} from "react-native";
import {GlassBadge} from "@/components/ui/GlassBadge";
import {colors, fontSize, fontWeight, space} from "@app/tokens";
import type {TChipOption} from "@/components/ui";

interface Props<T extends string> {
  options: TChipOption<T>[]
  value: T | null
  onChange: (value: T | null) => void
}

export function ChipFilter<T extends string>({
  options,
  value,
  onChange
}: Props<T>){
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={styles.content}
    >
      {options.map(({value: optionValue, label, icon:Icon, count}) => {
        const isActive = optionValue === value

        return (
          <Pressable
            key={optionValue ?? 'ALL'}
            onPress={() => onChange(optionValue)}
            accessibilityRole='button'
            accessibilityState={{ selected: isActive }}
          >
            <GlassBadge
              size='md'
              tintColor={isActive ? colors.secondary : undefined}
            >
              <Icon
                size={16}
                color={colors.text.primary}
              />
              <Text style={styles.label}>{label}</Text>
              {count !== undefined && (
                <Text style={[styles.count, isActive && styles.countActive]}>
                  {count}
                </Text>
              )}
            </GlassBadge>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 0
  },
  content: {
    gap: space[2],
    paddingTop: space[2],
    paddingBottom: space[3]
  },
  label: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium
  },
  count: {
    color: colors.text.muted,
    fontSize: fontSize.sm
  },
  countActive: {
    color: colors.text['little-muted']
  }
})