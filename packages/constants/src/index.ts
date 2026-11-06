import type {
  LibraryEntryResponseStatus,
  TitleListItemResponseType
} from '@app/api/src/generated/models'

export const STATUS_LABELS: Record<LibraryEntryResponseStatus, string> = {
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  ON_HOLD: 'On Hold'
}

export const TYPE_LABELS: Record<TitleListItemResponseType, string> = {
  MOVIE: 'Movie',
  TV_SHOW: 'Series',
  GAME: 'Game',
  BOOK: 'Book',
  ANIME: 'Anime'
}

export type TTitleType = keyof typeof TYPE_LABELS

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

export const LIBRARY_STATUES = Object.keys(STATUS_LABELS) as LibraryEntryResponseStatus[]

export * from './auth-form.constants'
export * from './role.constants'
export * from './rating-sources.constants'
export * from './review.constants'
export * from './library.constants'
export * from './title.constants'
