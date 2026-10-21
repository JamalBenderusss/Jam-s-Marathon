import {router, useLocalSearchParams} from "expo-router";
import {StyleSheet, Text, View} from "react-native";
import {useDiscoverFindByKey} from "@app/api";
import {useState} from "react";
import {colors, fontSize, space} from "@app/tokens";
import {getReleaseYear} from "@app/utils";
import {FriendAvatar, SHARE_FRIENDS} from "@/components/detail";
import {Input, ScreenTitle, SheetFooter} from "@/components/ui";
import {SectionCarousel} from "@/components/elements";

export default function ShareSheet() {

  const {key} = useLocalSearchParams<{ key: string }>()
  const {data} = useDiscoverFindByKey(key)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const title = data?.status === 200 ? data.data : null
  const heading = [title?.name, getReleaseYear(title?.releaseDate ?? null)].filter(Boolean).join(' ')

  const toggleFriend = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

  const recipients = SHARE_FRIENDS.filter(friend => selectedIds.includes(friend.id))
    .map(friend => friend.name)
    .join(', ')

  return (
    <View style={styles.root}>
      <View style={styles.inset}>
        <ScreenTitle>Share with Friends</ScreenTitle>
        <View style={styles.divider}></View>
      </View>

      <SectionCarousel title={heading}>
        {SHARE_FRIENDS.map(friend => (
          <FriendAvatar
            key={friend.id}
            name={friend.name}
            avatarUrl={friend.avatarUrl}
            isSelected={selectedIds.includes(friend.id)}
            onPress={() => toggleFriend(friend.id)}
          />
        ))}
      </SectionCarousel>

      <View style={[styles.inset, styles.form]}>
        {!!recipients && <Text style={styles.to}>To: {recipients}</Text>}

        <Input
          placeholder='Check this out!'
          multiline
        />

        <SheetFooter
          submitLabel='Send'
          onCancel={() => router.back()}
          onSubmit={() => router.back()}

        />
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  root: {
    paddingTop: space[6],
    paddingBottom: space[8],
  },
  inset: {
    paddingHorizontal: space[3]
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  form: {
    gap: space[4]
  },
  to: {
    color: colors.text.muted,
    fontSize: fontSize.sm
  },

})

