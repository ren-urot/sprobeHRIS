import { Outlet, useParams } from 'react-router-dom'
import EmployeeSidebar from '@/components/employee-detail/EmployeeSidebar'

export default function EmployeeDetailPage() {
  const { id = 'new' } = useParams<{ id: string }>()

  return (
    <div className="flex flex-col md:flex-row gap-5 p-4 md:p-7 xl:flex-1 xl:min-h-0 xl:overflow-hidden">
      <EmployeeSidebar employeeId={id} />
      <div className="flex-1 xl:min-h-0 xl:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Outlet />
      </div>
    </div>
  )
}
