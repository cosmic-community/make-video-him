export interface CosmicFile {
  url: string
  imgix_url: string
  name?: string
}

export type MetafieldValue =
  | string
  | number
  | boolean
  | { key?: string; value?: string }
  | null

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  type: string
  created_at: string
  modified_at: string
  published_at?: string
  thumbnail?: string
  metadata: Record<string, unknown>
}

export interface Character extends CosmicObject {
  type: 'characters'
  metadata: {
    name?: string
    reference_photo?: CosmicFile
    description?: string
    consistency_notes?: string
  }
}

export interface VideoClip extends CosmicObject {
  type: 'video-clips'
  metadata: {
    dialogue_script?: string
    character?: Character | string
    actions_effects?: MetafieldValue[] | MetafieldValue
    platform?: MetafieldValue
    duration?: MetafieldValue
    production_status?: MetafieldValue
    final_video?: CosmicFile
  }
}