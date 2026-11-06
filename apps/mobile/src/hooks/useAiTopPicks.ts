import {type DiscoverItemResponse, useAiRecommendations} from "@app/api";
import {useAuth} from "@/hooks/useAuth";

const STALE_TIME = 60 * 60 * 1000

export function useAiTopPicks(fallback: DiscoverItemResponse[]) {
  const {isAuthorized} = useAuth()

  const {data} = useAiRecommendations({
    query: {enabled: isAuthorized, staleTime: STALE_TIME }
  })

  const picks = data?.status === 200 ? data.data.items.map(({item}) => item) : fallback

  return picks.length ? picks : fallback
}