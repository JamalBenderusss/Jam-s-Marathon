import {StyleSheet, Text, View} from 'react-native'

import { colors, fontSize, space } from '@app/tokens'
import {GlassIconButton, Screen, ScreenTitle, ScrollBlurBackground, SearchField} from "@/components/ui";
import {useState} from "react";
import type {TLibraryStatus} from "@app/types";
import { useCurrentUser, useMyTasteStats, useLibraryTitlesInfinite} from "@app/api";
import {Redirect, router} from "expo-router";
import {StatusFilter} from "@/components/screens/library/StatusFilter";
import {LibraryCard} from "@/components/screens/library/LibraryCard";
import Animated, {useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {GRID_COLUMNS, useGridCardWidth} from "@/hooks";
import {useDebouncedValue} from "@app/hooks";
import {Layers} from "lucide-react-native";

const PAGE_SIZE = 21


export default function Library() {
  const [status, setStatus] = useState<TLibraryStatus | null>(null)
  const [search, setSearch] = useState('')

  const [headerHeight, setHeaderHeight] = useState(0)

  const { top } = useSafeAreaInsets()
  const { width } = useGridCardWidth()
  const scrollY = useSharedValue(0)

  const searchTerm = useDebouncedValue(search.trim())

  const { data: me, isLoading, isError} = useCurrentUser()

  const {data: tasteStats} = useMyTasteStats({
      query: { enabled: !!me}
  })

  const {data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage} = useLibraryTitlesInfinite({
    status: status ? [status] : undefined,
    searchTerm: searchTerm || undefined,
    take: PAGE_SIZE,
  },
  {
    query: {enabled: !!me,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages)=> {
        return lastPage.data.isHasMore ? allPages.length * PAGE_SIZE : undefined
    }
    },

  }
)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const entries = data?.pages.flatMap(page => page.data.items) ?? []

  const onEndReached = () => {
    if(hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if(isLoading) return <Screen />

  if(isError || !me) return <Redirect href='/login' />

  return (
    <View style={styles.root}>
      <Animated.FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
          <LibraryCard
            entry={item}
            width={width}
          />
        }
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          isPending ? null : (
            <Text style={styles.empty}>
              {searchTerm ? 'Nothing found' : 'Nothing here yet'}
            </Text>
          )
        }
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentInsetAdjustmentBehavior='never'
        contentContainerStyle={[
          styles.list,
          {paddingTop: headerHeight}
        ]}
        keyboardDismissMode='on-drag'
      />

      <View
          style={styles.header}
          pointerEvents='box-none'
          onLayout={event => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        <View style={[styles.title, {paddingTop: top}]}>
          <ScrollBlurBackground scrollY={scrollY} />
          <ScreenTitle
            actions={
              <GlassIconButton
                icon={Layers}
                accessibilityLabel='Collections'
                onPress={() => {
                  router.push('/collections')
                }}
              />
            }
          >
            Library
          </ScreenTitle>
          <SearchField
            value={search}
            placeholder='Index your library'
            onChangeText={setSearch}
          />
        </View>

        <StatusFilter
            value={status}
            onChange={setStatus}
            counts={tasteStats?.data.byStatus ?? {}}
            total={tasteStats?.data.totalEntries ?? 0}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    overflow: 'hidden',
    paddingHorizontal: space[3],
    gap: space[1],
    paddingBottom: space[2]
  },
  list: {
    gap: space[3],
    paddingHorizontal: space[3],
    paddingBottom: space[16],
  },
  row: { gap: space[3]},
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    textAlign: 'center'
  }
})
