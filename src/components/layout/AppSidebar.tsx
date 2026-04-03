import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Clock, Wallet, CalendarCheck, BarChart2, X } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/dashboard',  label: 'Dashboard',  Icon: LayoutDashboard },
  { path: '/employees',  label: 'Employees',  Icon: Users           },
  { path: '/attendance', label: 'Attendance', Icon: Clock           },
  { path: '/payroll',    label: 'Payroll',    Icon: Wallet          },
  { path: '/leave',      label: 'Leave',      Icon: CalendarCheck   },
  { path: '/reports',    label: 'Reports',    Icon: BarChart2       },
]

interface AppSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:block w-[230px] flex-shrink-0 m-7 bg-white rounded-card shadow-card py-3 self-start">
        {NAV_ITEMS.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
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

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[260px] bg-white shadow-xl z-40 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <span className="text-[16px] font-semibold text-brand-orange">Menu</span>
          <button onClick={onClose} className="text-[#888] hover:text-[#333]">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV_ITEMS.map(({ path, label, Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
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
      </div>
    </>
  )
}
