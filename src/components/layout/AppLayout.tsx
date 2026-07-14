import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import AppSidebar from './AppSidebar'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen xl:h-screen flex flex-col bg-brand-bg xl:overflow-hidden">
      <AppHeader onMenuClick={() => setSidebarOpen(v => !v)} />

      <div className="flex flex-1 xl:min-h-0 w-full max-w-[1639px] mx-auto relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="xl:flex-1 flex flex-col xl:min-h-0 xl:overflow-hidden min-w-0">
          <Outlet />
        </main>
      </div>

      <AppFooter />
      <Toaster position="top-right" richColors />
    </div>
  )
}
