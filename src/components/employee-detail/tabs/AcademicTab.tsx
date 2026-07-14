import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormPanel from '@/components/common/FormPanel'
import type { AcademicInfo } from '@/types/employee'

const defaults: AcademicInfo = { school: '', degree: '', yearStarted: '', yearGraduated: '', honors: '' }

export default function AcademicTab() {
  const [info, setInfo] = useState<AcademicInfo>(defaults)
  const set = (f: keyof AcademicInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInfo(p => ({ ...p, [f]: e.target.value }))

  const handleSave = () => {
    if (!info.school || !info.degree) { toast.error('School and degree are required.'); return }
    toast.success('Academic info saved successfully.')
  }

  return (
    <div className="flex flex-col gap-5">
      <FormPanel title="Academic">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">School / University</label>
            <Input value={info.school} onChange={set('school')} placeholder="Enter school name" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Degree / Course</label>
            <Input value={info.degree} onChange={set('degree')} placeholder="Enter degree or course" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1.5 flex-[0.4]">
            <label className="text-[13px] font-medium">Year Started</label>
            <Input value={info.yearStarted} onChange={set('yearStarted')} placeholder="YYYY" maxLength={4} />
          </div>
          <div className="flex flex-col gap-1.5 flex-[0.4]">
            <label className="text-[13px] font-medium">Year Graduated</label>
            <Input value={info.yearGraduated} onChange={set('yearGraduated')} placeholder="YYYY" maxLength={4} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Academic Honors</label>
            <Input value={info.honors} onChange={set('honors')} placeholder="Enter honors (if any)" />
          </div>
        </div>
      </FormPanel>
      <div className="flex justify-end">
        <Button variant="blue" className="px-16 h-12 text-[15px] rounded-xl" onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}
