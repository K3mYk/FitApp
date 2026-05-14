import { useEffect, useMemo, useState } from 'react'

export function useTimer(startedAt: number | null) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  const elapsedMs = useMemo(() => {
    if (!startedAt) return 0

    return now - startedAt
  }, [now, startedAt])

  return {
    elapsedMs,
    elapsedSeconds: Math.floor(elapsedMs / 1000),
  }
}
export type TimerState = {
  startedAt: number | null
  durationMs?: number
}

export function getElapsedMs(startedAt: number): number {
  return Date.now() - startedAt
}

export function getRemainingMs(startedAt: number, durationMs: number): number {
  return Math.max(0, durationMs - getElapsedMs(startedAt))
}

export function formatSeconds(totalMs: number): string {
  const minutes = Math.floor(totalMs / (1000 * 60))
  const seconds = Math.floor(totalMs / 1000)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

