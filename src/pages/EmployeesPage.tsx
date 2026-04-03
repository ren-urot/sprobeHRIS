import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import EmployeesToolbar from '@/components/employees/EmployeesToolbar'
import EmployeesTable from '@/components/employees/EmployeesTable'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { Employee, EmployeeStatus } from '@/types/employee'

const SEED: Employee[] = [
  { id: '100001', firstName: 'Christopher', lastName: 'Smith',    status: 'Regular',      dateHired: '2020/10/10' },
  { id: '100002', firstName: 'Michelle',    lastName: 'Anderson', status: 'Probationary', dateHired: '2020/10/10' },
  { id: '100003', firstName: 'Roberto',     lastName: 'Jackson',  status: 'Regular',      dateHired: '2020/10/10' },
  { id: '100004', firstName: 'Janice',      lastName: 'Smith',    status: 'Probationary', dateHired: '2020/10/10' },
  { id: '100005', firstName: 'John',        lastName: 'Doe',      status: 'Regular',      dateHired: '2020/10/10' },
  { id: '100006', firstName: 'Michelle',    lastName: 'Anderson', status: 'Probationary', dateHired: '2020/10/10' },
  { id: '100007', firstName: 'Roberto',     lastName: 'Jackson',  status: 'Regular',      dateHired: '2020/10/10' },
  { id: '100008', firstName: 'Janice',      lastName: 'Smith',    status: 'Probationary', dateHired: '2020/10/10' },
  { id: '100009', firstName: 'Chris',       lastName: 'Brown',    status: 'Regular',      dateHired: '2020/10/10' },
  { id: '100010', firstName: 'Anna',        lastName: 'Lee',      status: 'Probationary', dateHired: '2020/10/10' },
  { id: '100011', firstName: 'David',       lastName: 'Wilson',   status: 'Regular',      dateHired: '2020/10/10' },
]

const blankForm = { firstName: '', lastName: '', status: '' as EmployeeStatus | '', dateHired: '' }

export default function EmployeesPage() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<Employee[]>(SEED)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(9)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState(blankForm)

  const filtered = employees.filter(e =>
    `${e.firstName} ${e.lastName} ${e.id}`.toLowerCase().includes(search.toLowerCase())
  )
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleDelete = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id))
    toast.success('Employee deleted.')
  }

  const handleAdd = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error('First and last name are required.')
      return
    }
    if (!form.status) { toast.error('Status is required.'); return }

    const newId = String(100000 + employees.length + 1)
    const hired = form.dateHired
      ? new Date(form.dateHired).toLocaleDateString('en-CA').replace(/-/g, '/')
      : new Date().toLocaleDateString('en-CA').replace(/-/g, '/')

    setEmployees(prev => [
      ...prev,
      { id: newId, firstName: form.firstName.trim(), lastName: form.lastName.trim(), status: form.status as EmployeeStatus, dateHired: hired },
    ])
    toast.success(`${form.firstName} ${form.lastName} added.`)
    setAddOpen(false)
    setForm(blankForm)
  }

  return (
    <div className="p-4 md:p-7 flex flex-col xl:flex-1 xl:min-h-0">
      <h1 className="text-[30px] font-bold text-brand-orange mb-4">Employees</h1>

      <EmployeesToolbar
        onAdd={() => setAddOpen(true)}
        search={search}
        onSearch={v => { setSearch(v); setPage(1) }}
      />

      <EmployeesTable
        employees={paginated}
        total={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={n => { setRowsPerPage(n); setPage(1) }}
        onDelete={handleDelete}
        onView={id => navigate(`/employees/${id}/profile`)}
      />

      {/* Add Employee Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">First Name <span className="text-brand-orange">*</span></label>
                <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Enter first name" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">Last Name <span className="text-brand-orange">*</span></label>
                <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} placeholder="Enter last name" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">Status <span className="text-brand-orange">*</span></label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as EmployeeStatus }))}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Probationary">Probationary</SelectItem>
                    <SelectItem value="Contractual">Contractual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">Date Hired</label>
                <DatePicker value={form.dateHired} onChange={e => setForm(f => ({ ...f, dateHired: e.target.value }))} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="blue" onClick={handleAdd}>Add Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
