import { createBrowserRouter, RouterProvider, Navigate, useParams } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import EmployeeDetailLayout from '@/components/layout/EmployeeDetailLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import EmployeesPage from '@/pages/EmployeesPage'
import EmployeeDetailPage from '@/pages/EmployeeDetailPage'
import AttendancePage from '@/pages/AttendancePage'
import PayrollPage from '@/pages/PayrollPage'
import LeavePage from '@/pages/LeavePage'
import ReportsPage from '@/pages/ReportsPage'
import ProfileTab from '@/components/employee-detail/tabs/ProfileTab'
import EmploymentTab from '@/components/employee-detail/tabs/EmploymentTab'
import AcademicTab from '@/components/employee-detail/tabs/AcademicTab'
import GovernmentTab from '@/components/employee-detail/tabs/GovernmentTab'
import ProjectsTab from '@/components/employee-detail/tabs/ProjectsTab'
import SkillsTab from '@/components/employee-detail/tabs/SkillsTab'

function RedirectToProfile() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={`/employees/${id}/profile`} replace />
}

const router = createBrowserRouter([
  { path: '/',      element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },

  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard',  element: <DashboardPage /> },
      { path: '/employees',  element: <EmployeesPage /> },
      { path: '/attendance', element: <AttendancePage /> },
      { path: '/payroll',    element: <PayrollPage /> },
      { path: '/leave',      element: <LeavePage /> },
      { path: '/reports',    element: <ReportsPage /> },
    ],
  },

  {
    element: <EmployeeDetailLayout />,
    children: [
      {
        path: '/employees/:id',
        element: <EmployeeDetailPage />,
        children: [
          { index: true,        element: <RedirectToProfile /> },
          { path: 'profile',    element: <ProfileTab /> },
          { path: 'employment', element: <EmploymentTab /> },
          { path: 'academic',   element: <AcademicTab /> },
          { path: 'government', element: <GovernmentTab /> },
          { path: 'projects',   element: <ProjectsTab /> },
          { path: 'skills',     element: <SkillsTab /> },
        ],
      },
    ],
  },
], { basename: '/sprobeHRIS' })

export default function App() {
  return <RouterProvider router={router} />
}
