import { useState, useMemo } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import StatusBadge from '@/components/common/StatusBadge'
import type { ProbationaryEntry, ProbationaryStatus } from '@/types/dashboard'

const ALL_ENTRIES: ProbationaryEntry[] = [
  { id: '1',  fullName: 'Marcus',    email: 'marcus.jackson@sprobe.com',   status: '6th-month-eval' },
  { id: '2',  fullName: 'Sarah',     email: 'sarah.williams@sprobe.com',   status: 'just-started'   },
  { id: '3',  fullName: 'James',     email: 'james.rivera@sprobe.com',     status: '3rd-month-eval' },
  { id: '4',  fullName: 'Emily',     email: 'emily.santos@sprobe.com',     status: '2nd-month'      },
  { id: '5',  fullName: 'Robert',    email: 'robert.garcia@sprobe.com',    status: '3rd-month-eval' },
  { id: '6',  fullName: 'Linda',     email: 'linda.reyes@sprobe.com',      status: '5th-month'      },
  { id: '7',  fullName: 'Daniel',    email: 'daniel.cruz@sprobe.com',      status: '6th-month-eval' },
  { id: '8',  fullName: 'Patricia',  email: 'patricia.flores@sprobe.com',  status: '2nd-month'      },
  { id: '9',  fullName: 'Charles',   email: 'charles.mendoza@sprobe.com',  status: 'just-started'   },
  { id: '10', fullName: 'Barbara',   email: 'barbara.torres@sprobe.com',   status: '4th-month'      },
  { id: '11', fullName: 'Kevin',     email: 'kevin.castillo@sprobe.com',   status: '5th-month'      },
  { id: '12', fullName: 'Angela',    email: 'angela.ramos@sprobe.com',     status: 'just-started'   },
  { id: '13', fullName: 'Steven',    email: 'steven.morales@sprobe.com',   status: '3rd-month-eval' },
  { id: '14', fullName: 'Jessica',   email: 'jessica.navarro@sprobe.com',  status: '4th-month'      },
  { id: '15', fullName: 'Brian',     email: 'brian.delacruz@sprobe.com',   status: '6th-month-eval' },
]

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'all',           label: 'All status' },
  { value: 'just-started',  label: 'Just started' },
  { value: '2nd-month',     label: '2nd Month' },
  { value: '3rd-month-eval',label: 'For 3rd Month Evaluation' },
  { value: '4th-month',     label: '4th Month' },
  { value: '5th-month',     label: '5th Month' },
  { value: '6th-month-eval',label: 'For 6th month evaluation' },
]

export default function ProbationaryTable() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('today')

  const filtered = useMemo(() =>
    statusFilter === 'all'
      ? ALL_ENTRIES
      : ALL_ENTRIES.filter(e => e.status === (statusFilter as ProbationaryStatus)),
    [statusFilter]
  )

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 gap-3">
        <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#1A1A1A] whitespace-nowrap">Probationary progress</h3>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] sm:w-[140px] h-8 sm:h-9 text-[12px] sm:text-[13px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[85px] sm:w-[100px] h-8 sm:h-9 text-[12px] sm:text-[13px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table: horizontal scroll on mobile, vertical scroll whenever it doesn't fit the viewport */}
      <div className="overflow-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Table>
          <TableHeader>
            <tr className="bg-brand-th sticky top-0 z-10">
              <TableHead className="whitespace-nowrap">Full Name</TableHead>
              <TableHead className="whitespace-nowrap hidden sm:table-cell">Email</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-[#888] py-8">No entries match the selected filter.</TableCell>
              </TableRow>
            )}
            {filtered.map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="py-2.5 text-[13px] text-[#1A1A1A] whitespace-nowrap">{entry.fullName}</TableCell>
                <TableCell className="py-2.5 text-[13px] text-[#888] hidden sm:table-cell">{entry.email}</TableCell>
                <TableCell className="py-2.5 whitespace-nowrap"><StatusBadge status={entry.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
