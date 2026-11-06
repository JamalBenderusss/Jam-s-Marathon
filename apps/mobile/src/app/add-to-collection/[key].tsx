import {router, useLocalSearchParams} from "expo-router";
import {StyleSheet, Text, View} from "react-native";
import {GlassIconButton, ScreenTitle} from "@/components/ui";
import {Plus} from "lucide-react-native";
import {CollectionRow} from "@/components/screens/collections/CollectionRow";
import {useCollection} from "@/hooks";
import {colors, fontSize, space} from "@app/tokens";


export default function AddToCollection() {
  const { key } = useLocalSearchParams<{ key: string }>()
  const { collections, collectionIds, toggle } = useCollection(key)

  return (
    <View style={styles.root}>
      <ScreenTitle
        actions={
          <GlassIconButton
            icon={Plus}
            accessibilityLabel='New collection'
            onPress={() => router.push({
              pathname: '/collection-create',
              params: {titleKey: key}
              })
            }
          />
        }
      >
        Add to collection
      </ScreenTitle>

      {collections.map(collection => (
        <CollectionRow
          key={collection.id}
          collection={collection}
          isSelected={collectionIds.includes(collection.id)}
          onPress={() => toggle(collection.id)}
        />
      ))}

      {!collections.length && (
        <Text style={styles.empty}>Create your first collection</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: space[2],
    paddingTop: space[6],
    paddingHorizontal: space[3],
  },
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm
  }
})