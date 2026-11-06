import {useGridCardWidth} from "@/hooks";
import {useMyCollections} from "@app/api";
import {router, Stack} from "expo-router";
import {FlatList, Pressable, StyleSheet, Text} from "react-native";
import {Plus} from "lucide-react-native";
import {colors, fontSize, space} from "@app/tokens";
import {CollectionCard} from "@/components/screens/collections/CollectionCard";

const COLUMNS = 2

export default function Collections() {
  const {width} = useGridCardWidth(COLUMNS)
  const {data, isPending} = useMyCollections()

  const collections = data?.status === 200 ? data.data.items : []

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerBackButtonDisplayMode: 'minimal',
          title: 'Collections',
          headerRight: () => (
            <Pressable
              hitSlop={12}
              onPress={() => router.push('/collection-create')}
              accessibilityRole='button'
              accessibilityLabel='New Collection'
            >
              <Plus color={colors.text.primary} />
            </Pressable>
          )
        }}
      />

      <FlatList
        data={collections}
        keyExtractor={item => item.id}
        numColumns={COLUMNS}
        columnWrapperStyle={styles.row}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles.list}
        renderItem={({item}) =>
          <CollectionCard
            collection={item}
            width={width}
          />
        }
        ListEmptyComponent={
          isPending ? null : (
            <Text style={styles.empty}>No collections yet</Text>
          )
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: space[5],
    padding: space[3]
  },
  row: {gap: space[3]},
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: space[10]
  }
})