import { useState, useMemo } from 'react'
import {
  ChevronLeft, ChevronRight, UserCheck, UserX, Clock, Users,
  Download, TrendingUp, TrendingDown, CalendarDays, LayoutGrid,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import type { AttendanceRecord, AttendanceStatus } from '@/types/attendance'

/* ─── seed data ─────────────────────────────────────────────────────────── */
const SEED: AttendanceRecord[] = [
  { id: '1',  employeeId: '100001', employeeName: 'Christopher Smith',  date: '06/05/2022', timeIn: '08:00 AM', timeOut: '05:00 PM', totalHours: '9h 00m', status: 'Present' },
  { id: '2',  employeeId: '100002', employeeName: 'Michelle Anderson',  date: '06/05/2022', timeIn: '08:28 AM', timeOut: '05:00 PM', totalHours: '8h 32m', status: 'Late'    },
  { id: '3',  employeeId: '100003', employeeName: 'Roberto Jackson',    date: '06/05/2022', timeIn: '08:02 AM', timeOut: '05:00 PM', totalHours: '8h 58m', status: 'Present' },
  { id: '4',  employeeId: '100004', employeeName: 'Janice Smith',       date: '06/05/2022', timeIn: '—',        timeOut: '—',        totalHours: '—',      status: 'Absent'  },
  { id: '5',  employeeId: '100005', employeeName: 'John Doe',           date: '06/05/2022', timeIn: '—',        timeOut: '—',        totalHours: '—',      status: 'Leave'   },
  { id: '6',  employeeId: '100006', employeeName: 'Patricia Williams',  date: '06/05/2022', timeIn: '08:45 AM', timeOut: '05:30 PM', totalHours: '8h 45m', status: 'Late'    },
  { id: '7',  employeeId: '100007', employeeName: 'Roberto Jackson',    date: '06/05/2022', timeIn: '07:58 AM', timeOut: '05:00 PM', totalHours: '9h 02m', status: 'Present' },
  { id: '8',  employeeId: '100008', employeeName: 'Janice Smith',       date: '06/05/2022', timeIn: '08:05 AM', timeOut: '05:00 PM', totalHours: '8h 55m', status: 'Present' },
  { id: '9',  employeeId: '100009', employeeName: 'Chris Brown',        date: '06/05/2022', timeIn: '08:00 AM', timeOut: '05:00 PM', totalHours: '9h 00m', status: 'Present' },
  { id: '10', employeeId: '100010', employeeName: 'Anna Lee',           date: '06/05/2022', timeIn: '—',        timeOut: '—',        totalHours: '—',      status: 'Absent'  },
  { id: '11', employeeId: '100011', employeeName: 'David Wilson',       date: '06/05/2022', timeIn: '08:12 AM', timeOut: '05:00 PM', totalHours: '8h 48m', status: 'Present' },
  { id: '12', employeeId: '100012', employeeName: 'Karen Martinez',     date: '06/05/2022', timeIn: '08:00 AM', timeOut: '05:00 PM', totalHours: '9h 00m', status: 'Present' },
  { id: '13', employeeId: '100013', employeeName: 'James Taylor',       date: '06/05/2022', timeIn: '08:50 AM', timeOut: '05:00 PM', totalHours: '8h 10m', status: 'Late'    },
  { id: '14', employeeId: '100014', employeeName: 'Linda Harris',       date: '06/05/2022', timeIn: '—',        timeOut: '—',        totalHours: '—',      status: 'Absent'  },
  { id: '15', employeeId: '100015', employeeName: 'Mark Thompson',      date: '06/05/2022', timeIn: '07:55 AM', timeOut: '05:00 PM', totalHours: '9h 05m', status: 'Present' },
  { id: '16', employeeId: '100016', employeeName: 'Susan White',        date: '06/05/2022', timeIn: '08:00 AM', timeOut: '05:00 PM', totalHours: '9h 00m', status: 'Present' },
  { id: '17', employeeId: '100017', employeeName: 'Paul Garcia',        date: '06/05/2022', timeIn: '—',        timeOut: '—',        totalHours: '—',      status: 'Leave'   },
  { id: '18', employeeId: '100018', employeeName: 'Betty Clark',        date: '06/05/2022', timeIn: '08:20 AM', timeOut: '05:00 PM', totalHours: '8h 40m', status: 'Late'    },
]

/* ─── types / helpers ────────────────────────────────────────────────────── */
const STATUS_STYLE: Record<AttendanceStatus, string> = {
  Present: 'text-green-700 bg-green-100',
  Late:    'text-yellow-700 bg-yellow-100',
  Absent:  'text-red-700   bg-red-100',
  Leave:   'text-blue-700  bg-blue-100',
}

/* Trend badge matching the screenshot's coloured pill */
function TrendBadge({ value, up }: { value: string; up: boolean }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[12px] font-semibold px-2 py-0.5 rounded-full ${up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {value}
    </span>
  )
}


/* ─── main page ──────────────────────────────────────────────────────────── */
export default function AttendancePage() {
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [period, setPeriod]             = useState('30')
  const [page, setPage]                 = useState(1)
  const [rowsPerPage, setRowsPerPage]   = useState(8)

  const filtered = useMemo(() =>
    SEED.filter(r => {
      const q = search.toLowerCase()
      const matchSearch = r.employeeName.toLowerCase().includes(q) || r.employeeId.includes(q)
      const matchStatus = statusFilter === 'all' || r.status === statusFilter
      return matchSearch && matchStatus
    }),
    [search, statusFilter]
  )

  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const totalPages = Math.ceil(filtered.length / rowsPerPage)
  const start      = filtered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1
  const end        = Math.min(page * rowsPerPage, filtered.length)

  const counts = {
    total:   SEED.length,
    present: SEED.filter(r => r.status === 'Present').length,
    late:    SEED.filter(r => r.status === 'Late').length,
    absent:  SEED.filter(r => r.status === 'Absent').length,
  }

  return (
    <div className="p-4 md:p-7 flex flex-col gap-5 xl:flex-1 xl:min-h-0 xl:overflow-y-auto">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
        <h1 className="text-[30px] font-bold text-brand-orange">Attendance</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3 py-2 text-[13px] text-[#555] shadow-sm hover:bg-gray-50 transition">
            <CalendarDays size={14} className="text-brand-blue" />
            Jun 1, 2022 – Jun 30, 2022
          </button>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white border-gray-200">
              <LayoutGrid size={13} className="text-[#888] mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="blue" className="h-9 gap-2 text-[13px]" onClick={() => toast.success('Attendance exported.')}>
            <Download size={14} /> Export
          </Button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        {[
          {
            label: 'Total Employees',
            value: counts.total,
            vs: 16,
            pct: '12.5%',
            up: true,
            icon: <Users size={22} className="text-brand-blue" />,
            iconBg: 'bg-blue-50',
          },
          {
            label: 'Present',
            value: counts.present,
            vs: 8,
            pct: '25.0%',
            up: true,
            icon: <UserCheck size={22} className="text-green-600" />,
            iconBg: 'bg-green-50',
          },
          {
            label: 'Late',
            value: counts.late,
            vs: 5,
            pct: '20.0%',
            up: false,
            icon: <Clock size={22} className="text-yellow-500" />,
            iconBg: 'bg-yellow-50',
          },
          {
            label: 'Absent',
            value: counts.absent,
            vs: 2,
            pct: '50.0%',
            up: false,
            icon: <UserX size={22} className="text-brand-red" />,
            iconBg: 'bg-red-50',
          },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-card shadow-card p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#888] font-medium">{card.label}</span>
              <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-[36px] font-bold leading-none text-[#1A1A1A]">{card.value}</span>
              <TrendBadge value={card.pct} up={card.up} />
            </div>
            <p className="text-[12px] text-[#aaa]">vs. {card.vs} last period</p>
          </div>
        ))}
      </div>

      {/* ── Table toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
        <p className="text-[15px] font-semibold text-[#1A1A1A]">Attendance Records</p>
        <div className="flex items-center gap-3 flex-wrap">
          <Input
            placeholder="Search employee…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-[220px]"
          />
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-card shadow-card overflow-hidden overflow-x-auto flex-shrink-0">
        <Table>
          <TableHeader>
            <tr className="bg-brand-th">
              <TableHead>Employee ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Status</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-[#888] py-10">No records found.</TableCell>
              </TableRow>
            ) : paginated.map(r => (
              <TableRow key={r.id}>
                <TableCell className="py-[9px] text-[#888]">{r.employeeId}</TableCell>
                <TableCell className="py-[9px] font-medium text-brand-blue">{r.employeeName}</TableCell>
                <TableCell className="py-[9px]">{r.date}</TableCell>
                <TableCell className="py-[9px]">{r.timeIn}</TableCell>
                <TableCell className="py-[9px]">{r.timeOut}</TableCell>
                <TableCell className="py-[9px]">{r.totalHours}</TableCell>
                <TableCell className="py-[9px]">
                  <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${STATUS_STYLE[r.status]}`}>
                    {r.status === 'Leave' ? 'On Leave' : r.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-end gap-3 text-[13px] text-[#888] flex-shrink-0 pb-2">
        <span>Row per page:</span>
        <Select value={String(rowsPerPage)} onValueChange={v => { setRowsPerPage(Number(v)); setPage(1) }}>
          <SelectTrigger className="w-[70px] h-8 text-[13px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[8, 25, 50].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
        <span>{start}–{end} of {filtered.length}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="w-7 h-7" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

    </div>
  )
}
