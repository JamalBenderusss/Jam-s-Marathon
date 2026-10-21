import {useQueryClient} from "@tanstack/react-query";
import {
    getDiscoverFindMyStateQueryKey, getLibraryFindAllQueryKey,
    useDiscoverFindMyState, useLibrarySetStatusByDiscoverKey
} from "@app/api";
import type {TLibraryStatus} from "@app/types";
import {useAuth} from "@/hooks/useAuth";


export function  useLibraryStatus(key: string) {
    const queryClient = useQueryClient()

    const {isAuthorized} = useAuth()

    const { data: myState } = useDiscoverFindMyState(key, {
      query: { enabled: isAuthorized }
    })

    const { mutate, variables, isPending } = useLibrarySetStatusByDiscoverKey({
      mutation: {
        onSettled: () =>
          Promise.all([
          queryClient.invalidateQueries({
            queryKey: getDiscoverFindMyStateQueryKey(key)
          }),
          queryClient.invalidateQueries({
            queryKey: getLibraryFindAllQueryKey()
          })
          ])
      }
    })

    const savedStatus = myState?.data.libraryEntry?.status ?? null
    const pendingStatus = isPending ? variables?.data.status : undefined

    const setStatus = (status: TLibraryStatus) => {
        mutate({
            key,
            data: {
                status
            }
        })
    }
    return {
        isAuthorized,
        status: pendingStatus ?? savedStatus,
        rating: myState?.data.review?.rating ?? null,
        setStatus
    }
}