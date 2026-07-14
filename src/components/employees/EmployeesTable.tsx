import { Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { Employee } from '@/types/employee'

interface EmployeesTableProps {
  employees: Employee[]
  total: number
  page: number
  rowsPerPage: number
  onPageChange: (p: number) => void
  onRowsPerPageChange: (n: number) => void
  onDelete: (id: string) => void
  onView: (id: string) => void
}

export default function EmployeesTable({
  employees,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  onView,
}: EmployeesTableProps) {
  const start = (page - 1) * rowsPerPage + 1
  const end = Math.min(page * rowsPerPage, total)
  const totalPages = Math.ceil(total / rowsPerPage)

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2">
      {/* Pagination controls */}
      <div className="flex items-center justify-end gap-3 text-[13px] text-[#888] flex-shrink-0">
        <span>Row per page:</span>
        <Select value={String(rowsPerPage)} onValueChange={v => onRowsPerPageChange(Number(v))}>
          <SelectTrigger className="w-[70px] h-8 text-[13px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[9, 25, 50].map(n => (
              <SelectItem key={n} value={String(n)}>{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>{start}-{end} of {total}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="w-7 h-7" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Table fills remaining height */}
      <div className="flex-1 min-h-0 bg-white rounded-card shadow-card overflow-x-auto">
        <Table>
          <TableHeader>
            <tr className="bg-brand-th">
              <TableHead>Employee ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Hired</TableHead>
              <TableHead>Action</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp.id}>
                <TableCell className="py-3">{emp.id}</TableCell>
                <TableCell className="py-3 text-brand-blue">{emp.firstName}</TableCell>
                <TableCell className="py-3 text-brand-blue">{emp.lastName}</TableCell>
                <TableCell className="py-3">{emp.status}</TableCell>
                <TableCell className="py-3">{emp.dateHired}</TableCell>
                <TableCell className="py-3">
                  <button
                    onClick={() => onView(emp.id)}
                    className="w-[34px] h-[34px] rounded-full bg-brand-blue inline-flex items-center justify-center mr-1.5 hover:opacity-90"
                  >
                    <Eye size={15} color="white" />
                  </button>
                  <button
                    onClick={() => onDelete(emp.id)}
                    className="w-[34px] h-[34px] rounded-full bg-brand-red inline-flex items-center justify-center hover:opacity-90"
                  >
                    <Trash2 size={15} color="white" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
