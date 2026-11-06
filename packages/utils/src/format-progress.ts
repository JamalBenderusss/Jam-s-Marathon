import type {TProgressUnit} from '@app/types'

const PROGRESS_FORMATS: Record<TProgressUnit, (value: number) => string> = {
  EPISODE: value => `Ep ${value}`,
  CHAPTER: value => `Ch ${value}`,
  PAGE: value => `p. ${value}`,
  HOUR: value => `${value} h`,
  PERCENT: value => `${value}%`
}

export function formatProgress(
  progress: number |  null,
  unit: TProgressUnit | null
) {
if (progress === null || !unit) return null

return PROGRESS_FORMATS[unit](progress)
}