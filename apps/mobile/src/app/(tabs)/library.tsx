import {FlatList, StyleSheet, Text, View} from 'react-native'

import { colors, fontSize, space } from '@app/tokens'
import {Screen, ScreenTitle} from "@/components/ui";
import {useState} from "react";
import type {TLibraryStatus} from "@app/types";
import {useLibraryFindAll, useUserFindMe} from "@app/api";
import {Redirect, router} from "expo-router";
import {StatusFilter} from "@/components/library/StatusFilter";
import {TitleCard} from "@/components/elements";

export default function Library() {
  const { data: me, isLoading, isError} = useUserFindMe()

  const [status, setStatus] = useState<TLibraryStatus | null>(null)

  const {data, isPending} = useLibraryFindAll({
    status: status ? [status] : undefined, take: 21,

  }, {
    query: {enabled: !!me}
  })

  const entries = data?.status === 200 ? data.data.items : []

  if(isLoading) return <Screen />

  if(isError || !me) return <Redirect href='/login' />

  return (
    <Screen>
      <View style={styles.header}>
        <ScreenTitle>Library</ScreenTitle>
      </View>

      <StatusFilter
        value={status}
        onChange={setStatus}
      />

      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TitleCard
            title={item.title}
            onPress={() => {
              if(item.title?.key)
                router.push(`/title/${item.title.key}`)
            }}
          />
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          isPending ? null : <Text style={styles.empty}>Nothing here yet</Text>
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: space[3]
  },
  list: {
    gap: space[3],
    padding: space[3]
  },
  row: { gap: space[3]},
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    textAlign: 'center'
  }
})
