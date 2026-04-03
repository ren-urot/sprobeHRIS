import { NavLink } from 'react-router-dom'
import { User, Briefcase, GraduationCap, Landmark, FolderOpen, Zap } from 'lucide-react'
import type { EmployeeDetailTab } from '@/types/employee'

const tabs: { id: EmployeeDetailTab; label: string; Icon: React.ElementType }[] = [
  { id: 'profile',    label: 'Profile',    Icon: User },
  { id: 'employment', label: 'Employment', Icon: Briefcase },
  { id: 'academic',   label: 'Academic',   Icon: GraduationCap },
  { id: 'government', label: 'Government', Icon: Landmark },
  { id: 'projects',   label: 'Projects',   Icon: FolderOpen },
  { id: 'skills',     label: 'Skills',     Icon: Zap },
]

interface EmployeeSidebarProps {
  employeeId: string
}

export default function EmployeeSidebar({ employeeId }: EmployeeSidebarProps) {
  return (
    <>
      {/* Mobile: horizontal scrollable tabs */}
      <nav className="md:hidden w-full bg-white rounded-card shadow-card flex overflow-x-auto flex-shrink-0 [&::-webkit-scrollbar]:hidden">
        {tabs.map(({ id, label, Icon }) => (
          <NavLink
            key={id}
            to={`/employees/${employeeId}/${id}`}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-[13px] font-medium transition-colors border-b-[3px] whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-transparent text-[#333] hover:bg-[#fdf0f0]'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Desktop: vertical sidebar */}
      <nav className="hidden md:block w-[230px] bg-white rounded-card shadow-card py-3 flex-shrink-0 self-start">
        {tabs.map(({ id, label, Icon }) => (
          <NavLink
            key={id}
            to={`/employees/${employeeId}/${id}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors border-r-[3px] ${
                isActive
                  ? 'border-brand-orange bg-[#fdf0f0] text-brand-orange'
                  : 'border-transparent text-[#333] hover:bg-[#fdf0f0]'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
