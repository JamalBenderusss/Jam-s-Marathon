import {useLibraryStatus} from "@/hooks/useLibraryStatus";
import {router} from "expo-router";
import {Button} from "@/components/ui";
import {Star} from "lucide-react-native";
import {ADD_TO_LIBRARY_ACTION, LIBRARY_STATUS_ACTIONS, REVIEW_RATING} from "@app/constants";
import {LIBRARY_ACTION_ICON} from "@/components/detail/library-status/library-status.data";
import {CARD_CONFIG} from "@/components/elements";
import type {DiscoverDetailsResponseType} from "@app/api";

interface Props {
  titleKey: string,
  titleType: DiscoverDetailsResponseType
}

export function LibraryStatusButton({titleKey, titleType}: Props) {
  const {isAuthorized, status, rating, setStatus} = useLibraryStatus(titleKey)

  const openReview = () => router.push(`/review/${titleKey}`)

  if (status === 'COMPLETED') {
    return (
      <Button
        variant='secondary'
        size='lg'
        icon={Star}
        onPress={openReview}
      >
        {rating ? `Rated ${rating}/${REVIEW_RATING.max}` : 'Rate'}
      </Button>
    )
  }

  const action = status ? LIBRARY_STATUS_ACTIONS[status] : ADD_TO_LIBRARY_ACTION

  const onPress = () => {
    if (!isAuthorized) {
      router.push('/login')
      return
    }

    setStatus(action.nextStatus)

    if(action.nextStatus === 'COMPLETED') openReview()
  }

  return (
    <Button
      size='lg'
      variant='secondary'
      icon={LIBRARY_ACTION_ICON[action.nextStatus]}
      style={{backgroundColor: CARD_CONFIG[titleType].color}}
      onPress={onPress}
    >
      {action.label}
    </Button>
  )
}