import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Users, User, Settings, LogOut, Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/icons/logo.png'

interface AppHeaderProps {
  showEmployeeButton?: boolean
  onMenuClick?: () => void
}

const NOTIFICATIONS = [
  { id: '1', title: 'Leave request submitted',   body: 'Roberto Jackson submitted an emergency leave.',  time: '2 min ago',  read: false },
  { id: '2', title: 'Payroll generated',          body: 'June 2022 payroll has been successfully generated.', time: '1 hr ago', read: false },
  { id: '3', title: 'New employee added',         body: 'Sandra Robinson has been added to the system.', time: '3 hrs ago', read: false },
  { id: '4', title: 'Leave request approved',     body: "John Doe's sick leave has been approved.",      time: 'Yesterday', read: true  },
  { id: '5', title: 'Attendance exported',        body: 'Attendance report for June 5 was exported.',    time: 'Yesterday', read: true  },
]

export default function AppHeader({ showEmployeeButton = false, onMenuClick }: AppHeaderProps) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen]     = useState(false)
  const [notifOpen, setNotifOpen]         = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef   = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  return (
    <header className="bg-brand-orange w-full flex-shrink-0">
      <div className="max-w-[1639px] mx-auto flex items-center justify-between h-[60px] md:h-[70px] px-4 md:px-8">

        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          {onMenuClick && (
            <button onClick={onMenuClick} className="lg:hidden text-white p-1">
              <Menu size={22} />
            </button>
          )}
          <button onClick={() => navigate('/dashboard')} className="flex items-center cursor-pointer">
            <img src={logo} alt="Sprobe" className="h-[28px] md:h-[34px] brightness-0 invert" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {showEmployeeButton && (
            <Button
              variant="outline-white"
              onClick={() => navigate('/employees')}
              className="hidden sm:flex items-center gap-2"
            >
              <Users size={18} />
              <span className="hidden sm:inline">Employee</span>
            </Button>
          )}

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setNotifOpen(v => !v); setProfileOpen(false) }}
              className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[300px] sm:w-[340px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.14)] z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0]">
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[12px] text-brand-orange hover:underline">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.map(n => (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors flex gap-3 items-start ${!n.read ? 'bg-[#fdf0f0]/60' : ''}`}
                    >
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!n.read ? 'bg-brand-orange' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] ${!n.read ? 'font-semibold text-[#1A1A1A]' : 'font-medium text-[#444]'}`}>{n.title}</p>
                        <p className="text-[12px] text-[#888] mt-0.5 leading-snug">{n.body}</p>
                        <p className="text-[11px] text-[#BBB] mt-1">{n.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => { setProfileOpen(v => !v); setNotifOpen(false) }}
              className="flex items-center gap-2 text-white cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
                CS
              </div>
              <span className="hidden sm:inline text-[14px]">Christopher Smith</span>
              <ChevronDown size={16} className={`hidden sm:block transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[200px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] py-1.5 z-50">
                <div className="px-4 py-2.5 border-b border-[#F0F0F0] mb-1">
                  <p className="text-[13px] font-semibold text-[#1A1A1A]">Christopher Smith</p>
                  <p className="text-[11px] text-[#888] mt-0.5">HR Administrator</p>
                </div>
                <button
                  onClick={() => { navigate('/employees/100001/profile'); setProfileOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#333] hover:bg-[#F5F5F5] transition-colors"
                >
                  <User size={15} className="text-[#888]" /> My Profile
                </button>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#333] hover:bg-[#F5F5F5] transition-colors"
                >
                  <Settings size={15} className="text-[#888]" /> Settings
                </button>
                <div className="border-t border-[#F0F0F0] mt-1 pt-1">
                  <button
                    onClick={() => { navigate('/'); setProfileOpen(false) }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-brand-red hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
