import { cn } from '@/lib/utils'

interface FormPanelProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function FormPanel({ title, children, className }: FormPanelProps) {
  return (
    <div className={cn('bg-white rounded-card shadow-card p-7', className)}>
      <div className="flex items-center gap-4 mb-7">
        <h2 className="text-brand-orange text-[22px] font-semibold whitespace-nowrap">{title}</h2>
      </div>
      {children}
    </div>
  )
}
