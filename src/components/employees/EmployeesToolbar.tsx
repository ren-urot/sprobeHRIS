import { Search, Plus, Upload, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EmployeesToolbarProps {
  onAdd: () => void
  search: string
  onSearch: (v: string) => void
}

export default function EmployeesToolbar({ onAdd, search, onSearch }: EmployeesToolbarProps) {
  return (
    <div className="flex items-center gap-4 mb-4 flex-wrap">
      <Button variant="default" className="flex items-center gap-2 px-5" onClick={onAdd}>
        <Plus size={18} />
        Add Employee
      </Button>

      <div className="flex items-center bg-white border border-[#E0E0E0] rounded-lg overflow-hidden flex-1 min-w-[200px]">
        <Input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search"
          className="border-0 focus:border-0 rounded-none h-10"
        />
        <button className="px-3 text-brand-orange flex items-center">
          <Search size={20} />
        </button>
      </div>

      <Button variant="outline" className="flex items-center gap-2 px-5">
        <Upload size={18} />
        Export
      </Button>
      <Button variant="outline" className="flex items-center gap-2 px-5">
        <Download size={18} />
        Import
      </Button>
    </div>
  )
}
