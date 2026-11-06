interface IDuration {
  runtimeMinutes?: number | null
  episodeCount?: number | null
  episodeRuntimeMinutes?: number | null
  pageCount?: number | null
}

const MINUTES_IN_HOUR = 60

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR)
  const rest = minutes % MINUTES_IN_HOUR

  if (!hours) return `${rest}m`

  return rest ? `${hours}h ${rest}m` : `${hours}h`
}

export function formatDuration({
  runtimeMinutes,
  episodeCount,
  episodeRuntimeMinutes,
  pageCount
}: IDuration) {
  if(runtimeMinutes) return formatMinutes(runtimeMinutes)

  if(episodeCount) {
    const episodes = `${episodeCount} eps`

    return episodeRuntimeMinutes
      ? `${episodes} x ${formatMinutes(episodeRuntimeMinutes)}`
      : episodes
  }

  if(pageCount) return `${pageCount} pages`

  return null
}