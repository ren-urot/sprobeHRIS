import { useState, useRef, type KeyboardEvent } from 'react'
import { Search, X } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

const initialSkills = ['C++', 'Python', 'Vue', 'ReactJS', 'UI/UX Design', 'User Research']

export default function SkillsTab() {
  const [skills, setSkills] = useState<string[]>(initialSkills)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const removeSkill = (skill: string) => {
    setSkills(s => s.filter(x => x !== skill))
    toast.info(`"${skill}" removed.`)
  }

  const addSkill = () => {
    const trimmed = search.trim()
    if (!trimmed) return
    if (skills.includes(trimmed)) { toast.error(`"${trimmed}" already added.`); return }
    setSkills(s => [...s, trimmed])
    setSearch('')
    toast.success(`"${trimmed}" added.`)
    inputRef.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addSkill()
  }

  return (
    <div className="bg-white rounded-card shadow-card p-8 flex flex-col gap-6">
      <h2 className="text-brand-orange text-[22px] font-semibold">Skills</h2>

      <div className="relative max-w-[600px] mx-auto w-full">
        <Input
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search or type to add a skill…"
          className="pr-12 rounded-xl h-11"
        />
        <button
          onClick={addSkill}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-orange flex items-center hover:text-brand-orange/80"
        >
          <Search size={20} />
        </button>
      </div>

      {skills.length === 0
        ? <p className="text-center text-[#888] py-4">No skills added yet. Type a skill above and press Enter.</p>
        : (
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <div key={skill} className="flex items-center gap-2 bg-[#333] text-white rounded-full px-5 py-2.5 text-sm select-none">
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-white/60 hover:text-white flex items-center transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
