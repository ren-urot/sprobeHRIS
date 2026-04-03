import { useRef } from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
}

export function DatePicker({ value, defaultValue, onChange, className, placeholder }: DatePickerProps) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      className={cn('relative flex items-center h-10 w-full border border-[#E0E0E0] bg-white text-sm text-[#333] focus-within:border-brand-orange transition-colors cursor-pointer', className)}
      style={{ borderRadius: 5 }}
      onClick={() => ref.current?.showPicker?.()}
    >
      <input
        ref={ref}
        type="date"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none px-3 py-2 text-sm text-[#333] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
      />
      <Calendar size={16} className="text-brand-orange mr-3 flex-shrink-0 pointer-events-none" />
    </div>
  )
}
