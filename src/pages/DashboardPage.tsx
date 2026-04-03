import StatCard from '@/components/dashboard/StatCard'
import CalendarCard from '@/components/dashboard/CalendarCard'
import ProbationaryTable from '@/components/dashboard/ProbationaryTable'

function EmployeesIcon() {
  return (
    <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
      <path d="M18 21C18 18.8783 17.1571 16.8434 15.6569 15.3431C14.1566 13.8429 12.1217 13 10 13M10 13C7.87827 13 5.84344 13.8429 4.34315 15.3431C2.84285 16.8434 2 18.8783 2 21M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13ZM22 20C22 16.63 20 13.5 18 12C18.6574 11.5068 19.1831 10.8591 19.5306 10.1143C19.878 9.36945 20.0365 8.55047 19.992 7.7298C19.9475 6.90913 19.7014 6.11209 19.2755 5.4092C18.8495 4.70631 18.2569 4.11926 17.55 3.7" stroke="#1565C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TimeOffIcon() {
  return (
    <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
      <path d="M12 6V12L8 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#E91E8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function DashboardPage() {
  return (
    /* Mobile: natural scroll. Desktop (xl): fixed-height grid */
    <div className="p-4 md:p-7 xl:flex-1 xl:min-h-0 xl:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex flex-col xl:grid xl:grid-cols-[480px_1fr] gap-5 xl:h-full">

        {/* Left column */}
        <div className="flex flex-col gap-5 xl:min-h-0">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-5 flex-shrink-0">
            <StatCard icon={<EmployeesIcon />} value={200} label="Number of Employees" />
            <StatCard icon={<TimeOffIcon />} value={30} label="Time-off" />
          </div>
          {/* Calendar */}
          <div className="xl:flex-1 xl:min-h-0">
            <CalendarCard />
          </div>
        </div>

        {/* Right column — Probationary table */}
        <ProbationaryTable />
      </div>
    </div>
  )
}
