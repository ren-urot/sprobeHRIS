import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default function EmployeeDetailLayout() {
  return (
    <div className="min-h-screen xl:h-screen flex flex-col xl:overflow-hidden bg-brand-bg">
      <AppHeader showEmployeeButton />
      <main className="flex-1 flex flex-col xl:min-h-0 w-full max-w-[1639px] mx-auto">
        <Outlet />
      </main>
      <AppFooter />
      <Toaster position="top-right" richColors />
    </div>
  )
}
