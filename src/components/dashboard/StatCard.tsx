interface StatCardProps {
  icon: React.ReactNode
  value: number | string
  label: string
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card flex flex-col items-center justify-center gap-2 py-8 px-6 min-h-[180px]">
      <div className="mb-1">{icon}</div>
      <span className="text-[54px] font-bold leading-none text-[#1A1A1A]">{value}</span>
      <span className="text-[14px] text-[#888] mt-1">{label}</span>
    </div>
  )
}
