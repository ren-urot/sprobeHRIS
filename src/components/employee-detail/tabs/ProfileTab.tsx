import { useState, useRef } from 'react'
import { Camera, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import FormPanel from '@/components/common/FormPanel'
import type { EmployeeProfile } from '@/types/employee'

const defaultProfile: EmployeeProfile = {
  firstName: '', middleName: '', lastName: '',
  birthday: '', gender: '', maritalStatus: '', bloodType: '', religion: '',
  primaryAddress: '', city: '', zipCode: '', secondaryAddress: '',
  personalEmail: '', phone: '', photoUrl: '',
}

export default function ProfileTab() {
  const [profile, setProfile] = useState<EmployeeProfile>(defaultProfile)
  const [editing, setEditing] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (field: keyof EmployeeProfile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile(p => ({ ...p, [field]: e.target.value }))

  const setSelect = (field: keyof EmployeeProfile) => (v: string) =>
    setProfile(p => ({ ...p, [field]: v }))

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setProfile(p => ({ ...p, photoUrl: URL.createObjectURL(file) }))
  }

  const handleSave = () => {
    if (!profile.firstName || !profile.lastName || !profile.primaryAddress) {
      toast.error('Please fill in all required fields.')
      return
    }
    toast.success('Profile saved successfully.')
    setEditing(false)
  }

  const displayName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Christopher Smith'

  return (
    <div className="flex flex-col gap-5">
      {/* Personal */}
      <FormPanel title="Personal">
        <div className="flex items-start gap-5 mb-7">
          <div className="relative flex-shrink-0">
            <div
              className="w-[90px] h-[90px] rounded-full bg-[#E0E0E0] flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              {profile.photoUrl
                ? <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                : <Camera size={36} className="text-[#AAAAAA]" />
              }
            </div>
            <div
              className="absolute bottom-0 right-0 w-7 h-7 bg-brand-teal rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              <Camera size={12} color="white" />
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>

          <div className="mt-1 flex-1">
            <h3 className="text-xl font-semibold">{displayName}</h3>
            <p className="text-[13px] text-[#888]">smith.c@sprobe.com</p>
          </div>

          <button
            onClick={() => setEditing(e => !e)}
            className="ml-auto w-9 h-9 bg-brand-teal rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Pencil size={15} color="white" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">First Name <span className="text-brand-orange">*</span></label>
            <Input value={profile.firstName} onChange={set('firstName')} placeholder="Enter first name" disabled={!editing} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Middle Name <span className="text-brand-orange">*</span></label>
            <Input value={profile.middleName} onChange={set('middleName')} placeholder="Enter middle name" disabled={!editing} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Last Name <span className="text-brand-orange">*</span></label>
            <Input value={profile.lastName} onChange={set('lastName')} placeholder="Enter last name" disabled={!editing} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Birthday <span className="text-brand-orange">*</span></label>
            <DatePicker value={profile.birthday} onChange={set('birthday')} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Gender <span className="text-brand-orange">*</span></label>
            <Select value={profile.gender} onValueChange={setSelect('gender')} disabled={!editing}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Marital Status <span className="text-brand-orange">*</span></label>
            <Select value={profile.maritalStatus} onValueChange={setSelect('maritalStatus')} disabled={!editing}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Single','Married','Widowed','Divorced'].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Blood Type</label>
            <Select value={profile.bloodType} onValueChange={setSelect('bloodType')} disabled={!editing}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">City</label>
            <Input value={profile.city} onChange={set('city')} placeholder="Enter city" disabled={!editing} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Zip Code</label>
            <Input value={profile.zipCode} onChange={set('zipCode')} placeholder="Enter zip code" disabled={!editing} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Religion</label>
            <Input value={profile.religion} onChange={set('religion')} placeholder="Enter religion" disabled={!editing} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Primary Address <span className="text-brand-orange">*</span></label>
            <Input value={profile.primaryAddress} onChange={set('primaryAddress')} placeholder="Enter primary address" disabled={!editing} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Personal Email</label>
            <Input type="email" value={profile.personalEmail} onChange={set('personalEmail')} placeholder="Enter email" disabled={!editing} />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-medium">Phone</label>
            <Input value={profile.phone} onChange={set('phone')} placeholder="Enter phone" disabled={!editing} />
          </div>
        </div>
      </FormPanel>

      <div className="flex justify-end">
        <Button variant="blue" className="px-16 h-12 text-[15px] rounded-xl" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
