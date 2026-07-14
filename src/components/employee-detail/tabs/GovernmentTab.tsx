import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormPanel from '@/components/common/FormPanel'
import type { GovernmentIds } from '@/types/employee'

const defaults: GovernmentIds = { sss: '', hdmf: '', philhealth: '', bir: '', nbi: '' }

export default function GovernmentTab() {
  const [ids, setIds] = useState<GovernmentIds>(defaults)
  const set = (f: keyof GovernmentIds) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setIds(p => ({ ...p, [f]: e.target.value }))

  const handleSave = () => {
    toast.success('Government IDs saved successfully.')
  }

  return (
    <div className="flex flex-col gap-5">
      <FormPanel title="Government">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">SSS</label>
            <Input value={ids.sss} onChange={set('sss')} placeholder="Enter SSS number" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">HDMF</label>
            <Input value={ids.hdmf} onChange={set('hdmf')} placeholder="Enter HDMF number" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Philhealth</label>
            <Input value={ids.philhealth} onChange={set('philhealth')} placeholder="Enter philhealth" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">BIR</label>
            <Input value={ids.bir} onChange={set('bir')} placeholder="Enter BIR" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1.5 flex-[0.5]">
            <label className="text-[13px] font-medium">NBI</label>
            <Input value={ids.nbi} onChange={set('nbi')} placeholder="Enter NBI" />
          </div>
        </div>
      </FormPanel>
      <div className="flex justify-end">
        <Button variant="blue" className="px-16 h-12 text-[15px] rounded-xl" onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}
