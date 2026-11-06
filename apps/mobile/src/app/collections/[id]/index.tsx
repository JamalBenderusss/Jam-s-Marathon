import {Alert, FlatList, Pressable, StyleSheet, Text } from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {useQueryClient} from "@tanstack/react-query";
import {GRID_COLUMNS, useGridCardWidth} from "@/hooks";
import {getMyCollectionsQueryKey, useCollectionById, useDeleteCollection} from "@app/api";
import {Trash2} from "lucide-react-native";
import {colors, fontSize, space} from "@app/tokens";
import {PosterCard} from "@/components/detail";

export default function CollectionPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const queryClient = useQueryClient()
  const {width} = useGridCardWidth()

  const { data, isPending } = useCollectionById(id)
  const collection = data?.status === 200 ? data.data : null

  const {mutate: deleteCollection } = useDeleteCollection({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getMyCollectionsQueryKey()
        })
        router.back()
      }
    }
  })

  const onDelete = () => {
    Alert.alert('Delete collection?', 'Titles stay in your library.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteCollection({ id })
      }
    ])
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          title: collection?.name ?? '',
          headerRight: () => (
            <Pressable
              hitSlop={12}
              onPress={onDelete}
              accessibilityLabel="Delete collection"
              accessibilityRole="button"
            >
              <Trash2 color={colors.status.error} />
            </Pressable>
          )
        }}
      />

      <FlatList
        data={collection?.titles ?? []}
        keyExtractor={item => item.id}
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.row}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <PosterCard
            title={item}
            width={width}
          />
        )}
        ListEmptyComponent={
          isPending ? null : (
            <Text style={styles.empty}>Add titles from a title page</Text>
          )
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
      gap: space[3],
      paddingHorizontal: space[3],
      paddingBottom: space[16],
  },
  row: {gap: space[3]},
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: space[10]
  }
})