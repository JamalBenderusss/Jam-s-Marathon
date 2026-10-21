import type { DiscoverItemResponse } from "@app/api";
import {TITLE_CREDITS_LIMIT, TITLE_META_GENRES_LIMIT} from "@app/constants";

export function getReleaseYear(releaseDate: string | null) {
  return releaseDate ? new Date(releaseDate).getFullYear() : null
}

export function formatTitleMeta({
  releaseDate,
  genres
}: Pick<DiscoverItemResponse, 'releaseDate' | 'genres'>) {
  return [
    getReleaseYear(releaseDate),
      ...genres.slice(0, TITLE_META_GENRES_LIMIT)
  ]
   .filter(Boolean)
   .join(' * ')
}

export function joinNames(people: {name: string}[]) {
  return people
    .slice(0, TITLE_CREDITS_LIMIT)
    .map(({ name }) => name)
    .join(', ')
}