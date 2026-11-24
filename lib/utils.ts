import { getMetafieldValue } from '@/lib/cosmic'
import type { Character, VideoClip } from '@/types'

export function getClipCharacter(clip: VideoClip): Character | null {
  const character = clip.metadata?.character
  if (character && typeof character === 'object') {
    return character
  }
  return null
}

export function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item: unknown) => getMetafieldValue(item))
      .filter((item) => item.length > 0)
  }
  const single = getMetafieldValue(value)
  return single ? [single] : []
}

export function getEffects(clip: VideoClip): string[] {
  return toStringList(clip.metadata?.actions_effects)
}

export function getPlatform(clip: VideoClip): string {
  return getMetafieldValue(clip.metadata?.platform)
}

export function getStatus(clip: VideoClip): string {
  return getMetafieldValue(clip.metadata?.production_status)
}

export function formatDuration(value: unknown): string {
  const raw = getMetafieldValue(value)
  if (!raw) return ''
  const num = Number(raw)
  if (!Number.isNaN(num)) return `${num}s`
  return raw
}

export function getVideoSrc(clip: VideoClip): string {
  return clip.metadata?.final_video?.url ?? ''
}

export function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter((v) => v.length > 0))).sort((a, b) =>
    a.localeCompare(b)
  )
}

export function isLaserEffect(effect: string): boolean {
  return /laser/i.test(effect)
}