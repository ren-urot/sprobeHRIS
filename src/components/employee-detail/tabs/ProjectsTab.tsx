import { useState } from 'react'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import type { Project } from '@/types/employee'

const initialProjects: Project[] = [
  { id: '1', name: 'Digital Staging',        startDate: '05/20/2022', uploadDate: '05/25/2022' },
  { id: '2', name: 'Sasatsu Onsite',          startDate: '05/20/2022', uploadDate: '05/25/2022' },
  { id: '3', name: 'Daiken eCommerce',        startDate: '05/20/2022', uploadDate: '05/25/2022' },
  { id: '4', name: 'Honda Mobile App',        startDate: '05/20/2022', uploadDate: '05/25/2022' },
  { id: '5', name: 'Suzuki Crypto Trading',   startDate: '05/20/2022', uploadDate: '05/25/2022' },
  { id: '6', name: 'Toyota Employees Portal', startDate: '05/20/2022', uploadDate: '05/25/2022' },
]

const blankProject = { name: '', startDate: '', uploadDate: '' }

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(blankProject)

  const openAdd = () => {
    setEditId(null)
    setForm(blankProject)
    setOpen(true)
  }

  const openEdit = (proj: Project) => {
    setEditId(proj.id)
    setForm({ name: proj.name, startDate: proj.startDate, uploadDate: proj.uploadDate })
    setOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Project name is required.'); return }
    if (editId) {
      setProjects(p => p.map(proj => proj.id === editId ? { ...proj, ...form } : proj))
      toast.success('Project updated.')
    } else {
      const newProject: Project = { id: Date.now().toString(), ...form, uploadDate: form.uploadDate || new Date().toLocaleDateString('en-US') }
      setProjects(p => [...p, newProject])
      toast.success('Project added.')
    }
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    setProjects(p => p.filter(proj => proj.id !== id))
    toast.success('Project deleted.')
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button variant="default" className="flex items-center gap-2 px-5" onClick={openAdd}>
          <Plus size={18} />
          Add Project
        </Button>
      </div>

      <div className="bg-white rounded-card shadow-card overflow-x-auto">
        <Table>
          <TableHeader>
            <tr className="bg-brand-th">
              <TableHead>Projects List</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Action</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-[#888] py-8">No projects yet.</TableCell>
              </TableRow>
            )}
            {projects.map(proj => (
              <TableRow key={proj.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderOpen size={18} className="text-brand-blue" />
                    </div>
                    {proj.name}
                  </div>
                </TableCell>
                <TableCell>{proj.startDate}</TableCell>
                <TableCell>{proj.uploadDate}</TableCell>
                <TableCell>
                  <button
                    onClick={() => openEdit(proj)}
                    className="w-[34px] h-[34px] rounded-full bg-brand-teal inline-flex items-center justify-center mr-1.5 hover:opacity-90 transition-opacity"
                  >
                    <Pencil size={14} color="white" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="w-[34px] h-[34px] rounded-full bg-brand-red inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Trash2 size={14} color="white" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium">Project Name <span className="text-brand-orange">*</span></label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter project name" />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">Start Date</label>
                <DatePicker value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[13px] font-medium">Upload Date</label>
                <DatePicker value={form.uploadDate} onChange={e => setForm(f => ({ ...f, uploadDate: e.target.value }))} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="blue" onClick={handleSave}>{editId ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
