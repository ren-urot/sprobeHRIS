import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import FormPanel from '@/components/common/FormPanel'
import type { EmploymentInfo } from '@/types/employee'

const defaultInfo: EmploymentInfo = {
  idNumber: '', division: '', careerCounselor: '', onboardDate: '',
  positionAsHired: '', currentPosition: '', effectivity: '', jobRank: '',
  status: '', experience: '', workEmail: '',
}

export default function EmploymentTab() {
  const [info, setInfo] = useState<EmploymentInfo>(defaultInfo)

  const set = (f: keyof EmploymentInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInfo(p => ({ ...p, [f]: e.target.value }))
  const setS = (f: keyof EmploymentInfo) => (v: string) =>
    setInfo(p => ({ ...p, [f]: v }))

  const handleSave = () => {
    if (!info.status) { toast.error('Status is required.'); return }
    if (!info.experience) { toast.error('Experience is required.'); return }
    toast.success('Employment info saved successfully.')
  }

  return (
    <div className="flex flex-col gap-5">
      <FormPanel title="Employment">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-[0.5]">
            <label className="text-[13px] font-medium">ID No.</label>
            <Input value={info.idNumber} onChange={set('idNumber')} placeholder="Enter ID number" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Division</label>
            <Select value={info.division} onValueChange={setS('division')}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Engineering','Design','Human Resources','Finance','Marketing','Operations'].map(v =>
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Career Counselor</label>
            <Select value={info.careerCounselor} onValueChange={setS('careerCounselor')}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">On-board Date</label>
            <DatePicker value={info.onboardDate} onChange={set('onboardDate')} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Position as Hired</label>
            <Input value={info.positionAsHired} onChange={set('positionAsHired')} placeholder="Enter position" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Current Position</label>
            <Input value={info.currentPosition} onChange={set('currentPosition')} placeholder="Enter current position" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-[0.5]">
            <label className="text-[13px] font-medium">Effectivity</label>
            <DatePicker value={info.effectivity} onChange={set('effectivity')} />
          </div>
          <div className="flex flex-col gap-1.5 flex-[0.5]">
            <label className="text-[13px] font-medium">Job Rank</label>
            <Input value={info.jobRank} onChange={set('jobRank')} placeholder="Enter job rank" />
          </div>
          <div className="flex flex-col gap-1.5 flex-[0.5]">
            <label className="text-[13px] font-medium">Status <span className="text-brand-orange">*</span></label>
            <Select value={info.status} onValueChange={setS('status')}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Probationary">Probationary</SelectItem>
                <SelectItem value="Contractual">Contractual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 flex-[0.5]">
            <label className="text-[13px] font-medium">Experience <span className="text-brand-orange">*</span></label>
            <Select value={info.experience} onValueChange={setS('experience')}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 w-1/2">
            <label className="text-[13px] font-medium">Email</label>
            <Input type="email" value={info.workEmail} onChange={set('workEmail')} placeholder="Enter primary address" />
          </div>
        </div>
      </FormPanel>

      <div className="flex justify-end">
        <Button variant="blue" className="px-16 h-12 text-[15px] rounded-xl" onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}
