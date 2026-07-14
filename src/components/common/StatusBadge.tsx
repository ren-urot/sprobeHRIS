import { PROBATIONARY_STATUS_COLORS, PROBATIONARY_STATUS_LABELS, type ProbationaryStatus } from '@/types/dashboard'

interface StatusBadgeProps {
  status: ProbationaryStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = PROBATIONARY_STATUS_COLORS[status]
  const label = PROBATIONARY_STATUS_LABELS[status]
  return (
    <div className="flex items-center gap-2 text-[13px]">
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}
