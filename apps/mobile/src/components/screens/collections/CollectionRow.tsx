import type {CollectionListItemResponse} from "@app/api";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {Check} from "lucide-react-native";
import {colors, fontSize, fontWeight, radius, space} from "@app/tokens";


interface Props {
  collection: CollectionListItemResponse
  isSelected: boolean
  onPress: () => void
}

export function CollectionRow({ collection, isSelected, onPress}: Props) {
  const {name, previewCovers} = collection

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole='checkbox'
      accessibilityState={{ checked: isSelected }}
      style={styles.root}
    >
      <Image
        source={previewCovers[0] ?? null}
        contentFit='cover'
        style={styles.cover}
      />

      <View style={styles.text}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>

        {isSelected && (
          <Check
            size={22}
            color={colors.text.primary}
          />
        )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3]
  },
  cover: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.bg.card
  },
  text: { flex: 1, gap: space[1]},
  name: {
    color: colors.text.primary,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium
  }
})