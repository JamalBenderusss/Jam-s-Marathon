import {useQueryClient} from "@tanstack/react-query";
import {
    useUserTitle, useSetTitleStatus, useRemoveFromLibrary
} from "@app/api";
import type {TLibraryStatus} from "@app/types";
import {useAuth} from "@/hooks/useAuth";
import {invalidateTitleState} from "@/lib/invalidate-title-state";
import {formatProgress} from "@app/utils";


export function  useLibraryStatus(key: string) {
  const queryClient = useQueryClient()

  const {isAuthorized} = useAuth()

  const { data: myState } = useUserTitle(key, {
    query: { enabled: isAuthorized }
  })

  const onSettled = () => invalidateTitleState(queryClient, key)

  const setStatusMutation = useSetTitleStatus({mutation: {onSettled} })
  const removeMutation = useRemoveFromLibrary({mutation: {onSettled} })


  const savedStatus = myState?.data.libraryEntry?.status ?? null
  const isSetStatusPending = setStatusMutation.isPending
    ? setStatusMutation.variables?.data.status
    : undefined
  const isRemovePending = removeMutation.isPending

  const status = isRemovePending ? null : (isSetStatusPending ?? savedStatus)

  const setStatus = (status: TLibraryStatus) => {
    setStatusMutation.mutate({
      key,
      data: {
        status
      }
    })
  }

  const removeFromLibrary = () => {
    removeMutation.mutate({ key })
  }

  return {
    isAuthorized,
    status,
    rating: myState?.data.review?.rating ?? null,
    setStatus,
    isRemovePending,
    removeFromLibrary,
    progress: formatProgress(
      myState?.data.libraryEntry?.progress ?? null,
      myState?.data.libraryEntry?.progressUnit ?? null
    )
  }
}