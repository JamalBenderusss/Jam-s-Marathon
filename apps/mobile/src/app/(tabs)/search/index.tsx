 import { Stack } from 'expo-router'
import {FlatList, StyleSheet, Text, View} from 'react-native'
 import {colors, fontSize, space} from "@app/tokens";
 import {useState} from "react";
 import type {TTitleType} from "@app/constants";
 import {useDebouncedValue} from "@app/hooks";
 import {GRID_COLUMNS, useGridCardWidth} from "@/hooks";
 import {useSearchTitles} from "@app/api";
 import {TypeFilter} from "@/components/screens/search/TypeFilter";
 import {PosterCard} from "@/components/detail";

const MIN_QUERY_LENGTH = 2

export default function Index() {
  const [query, setQuery] = useState('')
  const [type, setType] =useState<TTitleType | null>(null)

  const debouncedQuery = useDebouncedValue(query.trim())
  const {width} = useGridCardWidth()

  const isQueryValid = debouncedQuery.length >= MIN_QUERY_LENGTH

  const {data, isFetching} = useSearchTitles(
    { q: debouncedQuery, type: type ? [type] : undefined },
    { query: { enabled: isQueryValid } }
  )

  const results = isQueryValid && data?.status === 200 ? data.data : []

  const emptyText = !isQueryValid
    ? 'Find movies, series, anime, books and games'
    : isFetching
      ? 'Searching'
      : 'Nothing found'

  return (
    <>
      <Stack.Title>Index</Stack.Title>
      <Stack.SearchBar
        placeholder="Index..."
        placement='automatic'
        onChangeText={event => setQuery(event.nativeEvent.text)}
      />

      <FlatList
        data={results}
        keyExtractor={item => item.key}
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.row}
        contentInsetAdjustmentBehavior='automatic'
        keyboardDismissMode='on-drag'
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.filter}>
            <TypeFilter
              value={type}
              onChange={setType}
            />
          </View>
        }
        renderItem={({item}) => (
          <PosterCard
            title={item}
            width={width}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>{emptyText}</Text>}
      />
    </>
  )
}
const styles = StyleSheet.create({
  list: {
    gap: space[3],
    paddingHorizontal: space[3],
    paddingBottom: space[16],
  },
  filter: {
    marginHorizontal: space[3],
    paddingHorizontal: space[3],
  },
  row: {gap: space[3]},
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: space[10]
  }
})