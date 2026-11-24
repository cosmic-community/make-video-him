import type { VideoClip } from '@/types'
import ClipCard from '@/components/ClipCard'
import EmptyState from '@/components/EmptyState'

interface ClipGridProps {
  clips: VideoClip[]
}

export default function ClipGrid({ clips }: ClipGridProps) {
  if (!clips || clips.length === 0) {
    return <EmptyState title="No clips found" message="Try a different filter or check back soon." />
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  )
}