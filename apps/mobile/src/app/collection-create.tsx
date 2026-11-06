import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {addToCollection, getApiErrorMessage, useCreateCollection} from "@app/api";
import {router, useLocalSearchParams} from "expo-router";
import {Input, ScreenTitle, SheetFooter} from "@/components/ui";
import {StyleSheet, View} from "react-native";
import {space} from "@app/tokens";
import {invalidateCollectionState} from "@/lib/invalidate-collection-state";


export default function CollectionCreate() {
  const {titleKey} = useLocalSearchParams<{ titleKey?: string }>()
  const queryClient = useQueryClient()
  const [name, setName] = useState('')

  const {mutate, isPending, error } = useCreateCollection({
    mutation: {
      onSuccess: async response => {
        const collectionId = response.data.id

        if (titleKey) {
          await addToCollection(collectionId, titleKey)
          await invalidateCollectionState(queryClient, collectionId, titleKey)
          router.back()
          return
        }

        await invalidateCollectionState(queryClient, collectionId)
        router.replace(`/collections/${collectionId}`)
      }
    }
  })

  const trimmedName = name.trim()

  return (
    <View style={styles.root}>
      <ScreenTitle> New collection</ScreenTitle>

      <Input
        placeholder='Collection name'
        value={name}
        onChangeText={setName}
        autoFocus
        error={getApiErrorMessage(error) ?? undefined}
      />

      <SheetFooter
        submitLabel='Create'
        isSubmitDisabled={!trimmedName || isPending}
        onCancel={router.back}
        onSubmit={() => mutate({ data: {name: trimmedName} })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: space[4],
    paddingTop: space[6],
    paddingHorizontal: space[3],
  }
})