import { toast } from 'sonner'
import { Users, Clock, DollarSign, Calendar, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const REPORTS = [
  {
    id: 'employee',
    title: 'Employee Report',
    description: 'Complete list of all employees with personal details, employment status, positions, and departments.',
    icon: <Users size={28} className="text-brand-blue" />,
    bg: 'bg-blue-50',
    stats: [
      { label: 'Total Employees', value: '200' },
      { label: 'Regular',         value: '145' },
      { label: 'Probationary',    value: '55'  },
    ],
    lastGenerated: 'June 5, 2022',
  },
  {
    id: 'attendance',
    title: 'Attendance Report',
    description: 'Daily attendance logs including time-in, time-out, late arrivals, absences, and total hours worked.',
    icon: <Clock size={28} className="text-brand-teal" />,
    bg: 'bg-teal-50',
    stats: [
      { label: 'Present Today', value: '185' },
      { label: 'Late',          value: '8'   },
      { label: 'Absent',        value: '7'   },
    ],
    lastGenerated: 'June 5, 2022',
  },
  {
    id: 'payroll',
    title: 'Payroll Summary',
    description: 'Monthly payroll breakdown per employee including gross pay, deductions (SSS, PhilHealth, Pag-IBIG, tax), and net pay.',
    icon: <DollarSign size={28} className="text-green-600" />,
    bg: 'bg-green-50',
    stats: [
      { label: 'Total Gross', value: '₱9.2M' },
      { label: 'Deductions',  value: '₱1.1M' },
      { label: 'Net Pay',     value: '₱8.1M' },
    ],
    lastGenerated: 'June 1, 2022',
  },
  {
    id: 'leave',
    title: 'Leave Report',
    description: 'Summary of all leave requests including approved, pending, and rejected leave applications per employee.',
    icon: <Calendar size={28} className="text-brand-orange" />,
    bg: 'bg-[#fdf0f0]',
    stats: [
      { label: 'Total Requests', value: '48'  },
      { label: 'Approved',       value: '35'  },
      { label: 'Pending',        value: '13'  },
    ],
    lastGenerated: 'June 5, 2022',
  },
]

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-7 flex flex-col xl:flex-1 xl:min-h-0 xl:overflow-y-auto gap-5">
      <h1 className="text-[24px] md:text-[30px] font-bold text-brand-orange">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {REPORTS.map(report => (
          <div key={report.id} className="bg-white rounded-card shadow-card p-7 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl ${report.bg} flex items-center justify-center flex-shrink-0`}>
                {report.icon}
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#1A1A1A]">{report.title}</h3>
                <p className="text-[13px] text-[#888] mt-1 leading-relaxed">{report.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {report.stats.map(s => (
                <div key={s.label} className="bg-[#F8F8F8] rounded-xl p-3.5 text-center">
                  <p className="text-[22px] font-bold text-[#1A1A1A]">{s.value}</p>
                  <p className="text-[12px] text-[#888] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-[#F0F0F0]">
              <p className="text-[12px] text-[#AAA]">Last generated: {report.lastGenerated}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5 text-[#666] border border-[#E0E0E0]"
                  onClick={() => toast.success(`${report.title} exported as CSV.`)}
                >
                  <Download size={14} /> CSV
                </Button>
                <Button
                  size="sm"
                  variant="blue"
                  className="gap-1.5"
                  onClick={() => toast.success(`${report.title} exported as PDF.`)}
                >
                  <FileText size={14} /> PDF
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
