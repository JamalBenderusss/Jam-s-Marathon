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

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

export * from './auth-form'
export * from './role'
export * from './review'
export * from './library'
export * from './title'
