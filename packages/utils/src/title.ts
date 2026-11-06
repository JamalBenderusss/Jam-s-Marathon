import {AGE_RATING_LABELS, TITLE_CREDITS_LIMIT, TITLE_META_GENRES_LIMIT} from "@app/constants";

interface ITitleMeta {
  releaseDate: string | null
  genres: string[]
  ageRating?: string | null
  duration?: string | null
}

export function getReleaseYear(releaseDate: string | null) {
  return releaseDate ? new Date(releaseDate).getFullYear() : null
}

export function joinNames(people: {name: string}[]) {
  return people
      .slice(0, TITLE_CREDITS_LIMIT)
      .map(({ name }) => name)
      .join(', ')
}

export function formateAgeRating(ageRating: string | null | undefined) {
  if(!ageRating) return null

  return AGE_RATING_LABELS[ageRating] ?? ageRating
}

export function formatTitleMeta({
  releaseDate,
  genres,
  ageRating,
  duration
}: ITitleMeta) {
  return [
    getReleaseYear(releaseDate),
    formateAgeRating(ageRating),
    duration,
    ...genres.slice(0, 3)
  ]
   .filter(Boolean)
   .join(' * ')
}

