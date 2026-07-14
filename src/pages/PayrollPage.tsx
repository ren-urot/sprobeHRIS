import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, FileText, DollarSign, Users, TrendingDown } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import type { PayrollRecord } from '@/types/payroll'

const fmt = (n: number) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`

const SEED: PayrollRecord[] = [
  { id:'1',  employeeId:'100001', employeeName:'Christopher Smith',  position:'Software Engineer',    basicPay:45000, overtime:3500, allowance:2000, sss:1125, philhealth:1125, pagibig:100, tax:4580, netPay:43570 },
  { id:'2',  employeeId:'100002', employeeName:'Michelle Anderson',  position:'UI/UX Designer',       basicPay:38000, overtime:0,    allowance:2000, sss:950,  philhealth:950,  pagibig:100, tax:3200, netPay:34800 },
  { id:'3',  employeeId:'100003', employeeName:'Roberto Jackson',    position:'Backend Developer',    basicPay:42000, overtime:2100, allowance:2000, sss:1050, philhealth:1050, pagibig:100, tax:3980, netPay:39920 },
  { id:'4',  employeeId:'100004', employeeName:'Janice Smith',       position:'HR Associate',         basicPay:28000, overtime:0,    allowance:1500, sss:700,  philhealth:700,  pagibig:100, tax:1250, netPay:26750 },
  { id:'5',  employeeId:'100005', employeeName:'John Doe',           position:'Project Manager',      basicPay:60000, overtime:5000, allowance:3000, sss:1125, philhealth:1500, pagibig:100, tax:8500, netPay:57775 },
  { id:'6',  employeeId:'100006', employeeName:'Patricia Williams',  position:'QA Engineer',          basicPay:35000, overtime:1500, allowance:2000, sss:875,  philhealth:875,  pagibig:100, tax:2800, netPay:33850 },
  { id:'7',  employeeId:'100007', employeeName:'James Garcia',       position:'DevOps Engineer',      basicPay:48000, overtime:4000, allowance:2500, sss:1125, philhealth:1200, pagibig:100, tax:5200, netPay:46875 },
  { id:'8',  employeeId:'100008', employeeName:'Linda Martinez',     position:'Business Analyst',     basicPay:40000, overtime:0,    allowance:2000, sss:1000, philhealth:1000, pagibig:100, tax:3500, netPay:36400 },
  { id:'9',  employeeId:'100009', employeeName:'Chris Brown',        position:'Frontend Developer',   basicPay:36000, overtime:1800, allowance:2000, sss:900,  philhealth:900,  pagibig:100, tax:2900, netPay:34900 },
  { id:'10', employeeId:'100010', employeeName:'Anna Lee',           position:'Data Analyst',         basicPay:32000, overtime:0,    allowance:1500, sss:800,  philhealth:800,  pagibig:100, tax:2100, netPay:29700 },
  { id:'11', employeeId:'100011', employeeName:'David Wilson',       position:'Systems Administrator',basicPay:43000, overtime:2500, allowance:2000, sss:1075, philhealth:1075, pagibig:100, tax:4200, netPay:41050 },
]

const ROWS_PER_PAGE = 8

export default function PayrollPage() {
  const [period, setPeriod] = useState('june-2022')
  const [page, setPage]     = useState(1)

  const paginated  = SEED.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  const totalPages = Math.ceil(SEED.length / ROWS_PER_PAGE)

  const totals = SEED.reduce((acc, r) => ({
    gross:      acc.gross      + r.basicPay + r.overtime + r.allowance,
    deductions: acc.deductions + r.sss + r.philhealth + r.pagibig + r.tax,
    net:        acc.net        + r.netPay,
  }), { gross: 0, deductions: 0, net: 0 })

  return (
    <div className="p-4 md:p-7 flex flex-col xl:flex-1 xl:min-h-0 xl:overflow-y-auto gap-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-[30px] font-bold text-brand-orange">Payroll</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="june-2022">June 2022</SelectItem>
              <SelectItem value="may-2022">May 2022</SelectItem>
              <SelectItem value="april-2022">April 2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="default" className="gap-2" onClick={() => toast.success('Payroll generated.')}>
            <FileText size={15} /> Generate Payroll
          </Button>
          <Button variant="blue" className="gap-2" onClick={() => toast.success('Payroll exported.')}>
            <Download size={15} /> Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Employees', value: SEED.length,         display: String(SEED.length),  icon: <Users       size={22} className="text-brand-blue"   />, bg: 'bg-blue-50',   color: 'text-[#1A1A1A]' },
          { label: 'Total Gross Pay', value: totals.gross,        display: fmt(totals.gross),    icon: <DollarSign  size={22} className="text-green-600"  />, bg: 'bg-green-50',  color: 'text-green-700' },
          { label: 'Total Deductions',value: totals.deductions,   display: fmt(totals.deductions),icon:<TrendingDown size={22} className="text-brand-red"   />, bg: 'bg-red-50',    color: 'text-brand-red' },
          { label: 'Total Net Pay',   value: totals.net,          display: fmt(totals.net),      icon: <DollarSign  size={22} className="text-brand-teal" />, bg: 'bg-teal-50',   color: 'text-brand-teal'},
        ].map(card => (
          <div key={card.label} className="bg-white rounded-card shadow-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] text-[#888]">{card.label}</p>
              <p className={`text-[22px] font-bold leading-tight truncate ${card.color}`}>{card.display}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card shadow-card overflow-x-auto flex-shrink-0">
        <Table>
          <TableHeader>
            <tr className="bg-brand-th">
              <TableHead className="whitespace-nowrap px-3">Emp ID</TableHead>
              <TableHead className="whitespace-nowrap px-3">Name</TableHead>
              <TableHead className="whitespace-nowrap px-3">Position</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">Basic Pay</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">Overtime</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">Allowance</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">SSS</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">PhilHealth</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">Pag-IBIG</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">Tax</TableHead>
              <TableHead className="whitespace-nowrap px-3 text-right">Net Pay</TableHead>
              <TableHead className="px-3">Action</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {paginated.map(r => (
              <TableRow key={r.id}>
                <TableCell className="px-3 py-[12px] text-[#888] whitespace-nowrap">{r.employeeId}</TableCell>
                <TableCell className="px-3 py-[12px] font-medium whitespace-nowrap text-brand-blue">{r.employeeName}</TableCell>
                <TableCell className="px-3 py-[12px] text-[#888] whitespace-nowrap">{r.position}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap">{fmt(r.basicPay)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap">{fmt(r.overtime)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap text-brand-blue">{fmt(r.allowance)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap text-brand-red">{fmt(r.sss)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap text-brand-red">{fmt(r.philhealth)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap text-brand-red">{fmt(r.pagibig)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap text-brand-red">{fmt(r.tax)}</TableCell>
                <TableCell className="px-3 py-[12px] text-right whitespace-nowrap font-semibold text-green-700">{fmt(r.netPay)}</TableCell>
                <TableCell className="px-3 py-[12px]">
                  <button
                    onClick={() => toast.info(`Payslip for ${r.employeeName}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue text-white text-[12px] font-medium hover:bg-brand-blue/90 whitespace-nowrap"
                  >
                    <FileText size={13} /> Payslip
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-3 text-[13px] text-[#888]">
        <span>{(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, SEED.length)} of {SEED.length}</span>
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
