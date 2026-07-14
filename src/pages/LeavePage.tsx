import { useState, useMemo } from 'react'
import { Plus, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import type { LeaveRequest, LeaveType, LeaveStatus } from '@/types/leave'

const SEED: LeaveRequest[] = [
  { id:'1',  employeeId:'100001', employeeName:'Christopher Smith',  leaveType:'Vacation Leave',   startDate:'06/10/2022', endDate:'06/12/2022', days:3, reason:'Family vacation',           status:'Approved',  appliedDate:'06/01/2022' },
  { id:'2',  employeeId:'100002', employeeName:'Michelle Anderson',  leaveType:'Sick Leave',       startDate:'06/06/2022', endDate:'06/06/2022', days:1, reason:'Fever and cold',             status:'Approved',  appliedDate:'06/05/2022' },
  { id:'3',  employeeId:'100003', employeeName:'Roberto Jackson',    leaveType:'Emergency Leave',  startDate:'06/07/2022', endDate:'06/08/2022', days:2, reason:'Family emergency',           status:'Pending',   appliedDate:'06/06/2022' },
  { id:'4',  employeeId:'100004', employeeName:'Janice Smith',       leaveType:'Vacation Leave',   startDate:'06/15/2022', endDate:'06/17/2022', days:3, reason:'Rest and recreation',        status:'Pending',   appliedDate:'06/04/2022' },
  { id:'5',  employeeId:'100005', employeeName:'John Doe',           leaveType:'Sick Leave',       startDate:'06/05/2022', endDate:'06/05/2022', days:1, reason:'Doctor appointment',         status:'Approved',  appliedDate:'06/04/2022' },
  { id:'6',  employeeId:'100006', employeeName:'Patricia Williams',  leaveType:'Vacation Leave',   startDate:'06/20/2022', endDate:'06/24/2022', days:5, reason:'Planned vacation',           status:'Pending',   appliedDate:'06/05/2022' },
  { id:'7',  employeeId:'100007', employeeName:'James Garcia',       leaveType:'Emergency Leave',  startDate:'06/03/2022', endDate:'06/03/2022', days:1, reason:'Urgent family matter',       status:'Approved',  appliedDate:'06/02/2022' },
  { id:'8',  employeeId:'100008', employeeName:'Linda Martinez',     leaveType:'Sick Leave',       startDate:'06/09/2022', endDate:'06/10/2022', days:2, reason:'Flu symptoms',               status:'Rejected',  appliedDate:'06/07/2022' },
  { id:'9',  employeeId:'100009', employeeName:'Chris Brown',        leaveType:'Vacation Leave',   startDate:'06/27/2022', endDate:'06/30/2022', days:4, reason:'Year-end leave balance',     status:'Pending',   appliedDate:'06/06/2022' },
  { id:'10', employeeId:'100010', employeeName:'Anna Lee',           leaveType:'Maternity Leave',  startDate:'07/01/2022', endDate:'10/01/2022', days:90,'reason':'Maternity',              status:'Approved',  appliedDate:'06/01/2022' },
  { id:'11', employeeId:'100011', employeeName:'David Wilson',       leaveType:'Sick Leave',       startDate:'06/08/2022', endDate:'06/08/2022', days:1, reason:'Medical check-up',           status:'Rejected',  appliedDate:'06/07/2022' },
]

const STATUS_STYLE: Record<LeaveStatus, string> = {
  Pending:  'text-yellow-700 bg-yellow-100',
  Approved: 'text-green-700  bg-green-100',
  Rejected: 'text-red-700    bg-red-100',
}

const LEAVE_TYPES: LeaveType[] = [
  'Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Maternity Leave', 'Paternity Leave',
]

const blank = { employeeName: '', leaveType: '' as LeaveType | '', startDate: '', endDate: '', reason: '' }

const ROWS_PER_PAGE = 8

export default function LeavePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(SEED)
  const [open, setOpen]         = useState(false)
  const [form, setForm]         = useState(blank)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch]     = useState('')
  const [page, setPage]         = useState(1)

  const filtered = useMemo(() =>
    requests.filter(r => {
      const q = search.toLowerCase()
      const matchSearch = r.employeeName.toLowerCase().includes(q) || r.employeeId.includes(q)
      const matchStatus = statusFilter === 'all' || r.status === statusFilter
      return matchSearch && matchStatus
    }),
    [requests, search, statusFilter]
  )

  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE)

  const counts = {
    total:    requests.length,
    pending:  requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
    rejected: requests.filter(r => r.status === 'Rejected').length,
  }

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
    toast.success('Leave request approved.')
  }

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r))
    toast.error('Leave request rejected.')
  }

  const handleSubmit = () => {
    if (!form.employeeName.trim()) { toast.error('Employee name is required.'); return }
    if (!form.leaveType)           { toast.error('Leave type is required.');    return }
    if (!form.startDate)           { toast.error('Start date is required.');    return }
    if (!form.endDate)             { toast.error('End date is required.');      return }

    const start = new Date(form.startDate)
    const end   = new Date(form.endDate)
    const days  = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1)

    const fmt = (d: Date) => `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}/${d.getFullYear()}`

    const newReq: LeaveRequest = {
      id:           Date.now().toString(),
      employeeId:   '100000',
      employeeName: form.employeeName.trim(),
      leaveType:    form.leaveType as LeaveType,
      startDate:    fmt(start),
      endDate:      fmt(end),
      days,
      reason:       form.reason.trim(),
      status:       'Pending',
      appliedDate:  fmt(new Date()),
    }
    setRequests(prev => [newReq, ...prev])
    toast.success('Leave request submitted.')
    setOpen(false)
    setForm(blank)
  }

  return (
    <div className="p-4 md:p-7 flex flex-col xl:flex-1 xl:min-h-0 xl:overflow-y-auto gap-5">
      <h1 className="text-[30px] font-bold text-brand-orange">Leave Management</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Requests', value: counts.total,    color: 'text-[#1A1A1A]', bg: 'bg-blue-50',    dot: 'bg-brand-blue'  },
          { label: 'Pending',        value: counts.pending,  color: 'text-yellow-700',bg: 'bg-yellow-50',  dot: 'bg-yellow-500' },
          { label: 'Approved',       value: counts.approved, color: 'text-green-700', bg: 'bg-green-50',   dot: 'bg-green-500'  },
          { label: 'Rejected',       value: counts.rejected, color: 'text-brand-red', bg: 'bg-red-50',     dot: 'bg-brand-red'  },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-card shadow-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`w-5 h-5 rounded-full ${card.dot}`} />
            </div>
            <div>
              <p className="text-[13px] text-[#888]">{card.label}</p>
              <p className={`text-[30px] font-bold leading-tight ${card.color}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Input
            placeholder="Search employee…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full sm:w-[240px]"
          />
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1) }}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="default" className="gap-2" onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Leave Request
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card shadow-card overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <tr className="bg-brand-th">
              <TableHead>Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-[#888] py-10">No leave requests found.</TableCell>
              </TableRow>
            ) : paginated.map(r => (
              <TableRow key={r.id}>
                <TableCell className="py-[12px] font-medium whitespace-nowrap">{r.employeeName}</TableCell>
                <TableCell className="py-[12px] whitespace-nowrap">{r.leaveType}</TableCell>
                <TableCell className="py-[12px] whitespace-nowrap">{r.startDate}</TableCell>
                <TableCell className="py-[12px] whitespace-nowrap">{r.endDate}</TableCell>
                <TableCell className="py-[12px]">{r.days}</TableCell>
                <TableCell className="py-[12px] max-w-[180px] truncate text-[#888]">{r.reason}</TableCell>
                <TableCell className="py-[12px] whitespace-nowrap text-[#888]">{r.appliedDate}</TableCell>
                <TableCell className="py-[12px]">
                  <span className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap ${STATUS_STYLE[r.status]}`}>
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="py-[12px]">
                  {r.status === 'Pending' ? (
                    <div className="flex gap-1.5 -ml-3">
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="w-[30px] h-[30px] rounded-full bg-green-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                      >
                        <Check size={14} color="white" />
                      </button>
                      <button
                        onClick={() => handleReject(r.id)}
                        className="w-[30px] h-[30px] rounded-full bg-brand-red flex items-center justify-center hover:opacity-90 transition-opacity"
                      >
                        <X size={14} color="white" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-[#CCC] text-[12px]">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-3 text-[13px] text-[#888] flex-shrink-0">
        <span>Row per page:</span>
        <Select value={String(ROWS_PER_PAGE)} onValueChange={() => {}}>
          <SelectTrigger className="w-[70px] h-8 text-[13px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[8, 25, 50].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
        <span>{filtered.length === 0 ? '0' : (page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="w-7 h-7" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Add Leave Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Leave Request</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium">Employee Name <span className="text-brand-orange">*</span></label>
              <Input value={form.employeeName} onChange={e => setForm(f => ({ ...f, employeeName: e.target.value }))} placeholder="Enter employee name" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium">Leave Type <span className="text-brand-orange">*</span></label>
              <Select value={form.leaveType} onValueChange={v => setForm(f => ({ ...f, leaveType: v as LeaveType }))}>
                <SelectTrigger><SelectValue placeholder="Select leave type" /></SelectTrigger>
                <SelectContent>
                  {LEAVE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">Start Date <span className="text-brand-orange">*</span></label>
                <DatePicker value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">End Date <span className="text-brand-orange">*</span></label>
                <DatePicker value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium">Reason</label>
              <Input value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} placeholder="Enter reason for leave" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="blue" onClick={handleSubmit}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
