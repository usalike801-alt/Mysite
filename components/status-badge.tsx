import type { OrderStatus } from '@/lib/data'
import { cn } from '@/lib/utils'

const styles: Record<OrderStatus, string> = {
  processing: 'bg-chart-3/15 text-chart-3',
  'in-progress': 'bg-chart-2/15 text-chart-2',
  completed: 'bg-primary/15 text-primary',
}

const labels: Record<OrderStatus, string> = {
  processing: 'Processing',
  'in-progress': 'In progress',
  completed: 'Completed',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        styles[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  )
}
