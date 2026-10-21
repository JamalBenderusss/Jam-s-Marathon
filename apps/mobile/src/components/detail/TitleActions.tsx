import {Bookmark, Star, Share} from "lucide-react-native";
import {View, StyleSheet} from "react-native";
import {ActionButton} from "@/components/ui";
import {REVIEW_RATING} from "@app/constants";
import {space} from "@app/tokens";
import {useLibraryStatus, useProtectedPush} from "@/hooks";

export function TitleActions({titleKey}: {titleKey: string}) {

  const { rating } = useLibraryStatus(titleKey)

  const pushProtected = useProtectedPush()

  return (
    <View style={styles.actions}>
      <ActionButton
        icon={Bookmark}
        label='Watchlist'
        onPress={() => {}}
      />
      <ActionButton
        icon={Star}
        label={rating ? `${rating}/${REVIEW_RATING.max}` : 'Rate'}
        onPress={() =>
          pushProtected(`/review/${titleKey}`)
        }
        isActive={!!rating}
      />
      <ActionButton
        icon={Share}
        label='Share'
        onPress={() => pushProtected(`/share/${titleKey}`)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  actions: {
    paddingVertical: space[3],
    flexDirection: 'row',
    gap: space[6]
  },
})