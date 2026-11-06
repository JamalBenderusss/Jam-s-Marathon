export const RATING_SOURCES = {
  TMDB: { label: 'TMDB', color: '#01B4E4', scale: 10},
  RAWG: { label: 'RAWG', color: '#FFFFFF', scale: 5},
  SHIKIMORI: { label: 'Shikimori', color: '#E8762C', scale: 10},
  GOOGLE_BOOKS: { label: 'Google Books', color: '#4285F4', scale: 5}
} as const

export const METACRITIC = {
  label: 'Metacritic',
  scale: 100,
  goodScore: 75,
  mixScore: 50
} as const

export const METACRITIC_COLORS = {
  good: '#66CC33',
  mixed: '#FFCC33',
  bad: '#FF0000'
} as const

export const AGE_RATING_LABELS: Record<string, string> = {
  G: '0+',
  'TV-Y': '0+',
  'TV-G': '0+',
  E: '0+',
  'TV-Y7': '7+',
  PG: '7+',
  'TV-PG': '7+',
  'E10+': '10+',
  'PG-13': '13+',
  T: '13+',
  'TV-14': '14+',
  R: '17+',
  'R-17': '17+',
  'R+': '17+',
  M: '17+',
  'TV-MA': '17+',
  'NC-17': '18+',
  AD: '18+',
  Rx: '18+',
}