import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getDateValue } from '@/lib/cosmic'
import { getClipCharacter } from '@/lib/utils'
import type { Character, VideoClip } from '@/types'

const CLIP_PROPS = ['id', 'title', 'slug', 'type', 'metadata', 'created_at', 'modified_at']
const CHARACTER_PROPS = ['id', 'title', 'slug', 'type', 'metadata', 'created_at', 'modified_at']

export async function getClips(): Promise<VideoClip[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects.find({ type: 'video-clips' }).props(CLIP_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const clips = (response.objects ?? []) as VideoClip[]
    return clips.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch video clips')
  }
}

export async function getClipBySlug(slug: string): Promise<VideoClip | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects.findOne({ type: 'video-clips', slug }).props(CLIP_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const clip = response.object as VideoClip | undefined
    return clip ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch video clip')
  }
}

export async function getCharacters(): Promise<Character[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects.find({ type: 'characters' }).props(CHARACTER_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const characters = (response.objects ?? []) as Character[]
    return characters.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects.findOne({ type: 'characters', slug }).props(CHARACTER_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const character = response.object as Character | undefined
    return character ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch character')
  }
}

export async function getClipsForCharacter(characterId: string): Promise<VideoClip[]> {
  const clips = await getClips()
  return clips.filter((clip) => {
    const character = getClipCharacter(clip)
    return character !== null && character.id === characterId
  })
}