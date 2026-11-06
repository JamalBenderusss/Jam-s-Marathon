import {useQueryClient} from "@tanstack/react-query";
import {
  useAddToCollection,
  useMyCollections, useRemoveFromCollection,
  useUserTitle
} from "@app/api";
import {invalidateCollectionState} from "@/lib/invalidate-collection-state";


export function useCollection(key: string) {
  const queryClient = useQueryClient()

  const {data: collectionsData} = useMyCollections()
  const {data: userTitle} = useUserTitle(key)

  const collections =
   collectionsData?.status === 200 ? collectionsData.data.items : []
  const collectionIds = userTitle?.data.collectionIds ?? []

  const onSettled = (_data: unknown, _error: unknown, {id}: { id: string }) => {
    invalidateCollectionState(queryClient, id, key)
  }

  const addMutation = useAddToCollection({ mutation: { onSettled } })
  const removeMutation = useRemoveFromCollection({ mutation: { onSettled }})

  const toggle = (id: string) => {
    const mutation = collectionIds.includes(id) ? removeMutation : addMutation

    mutation.mutate({ id, key })
  }

  return {collections, collectionIds, toggle}
}