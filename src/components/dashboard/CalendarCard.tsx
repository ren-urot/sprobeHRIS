import { Link } from 'react-router-dom'
import type { CalendarEvent } from '@/types/dashboard'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

// June 2022 calendar data (starts Sat column = 26 May prev month)
const weeks = [
  [{ d: 26, other: true }, { d: 27, other: true }, { d: 28, other: true }, { d: 29, other: true }, { d: 30, other: true }, { d: 31, other: true }, { d: 1, other: false }],
  [{ d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }],
  [{ d: 9 }, { d: 10 }, { d: 11 }, { d: 12 }, { d: 13 }, { d: 14 }, { d: 15 }],
  [{ d: 16 }, { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }],
  [{ d: 23 }, { d: 24 }, { d: 25 }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }],
] as { d: number; other?: boolean }[][]

const events: CalendarEvent[] = [
  { day: 30, types: ['meeting'] },
  { day: 5,  types: ['today', 'meeting'] },
  { day: 8,  types: ['meeting'] },
  { day: 14, types: ['meeting'] },
  { day: 18, types: ['meeting', 'meeting', 'meeting'] },
  { day: 19, types: ['meeting'] },
]

function getDots(day: number, isOther: boolean) {
  if (isOther) return events.filter(e => e.day === day && day === 30)
  return events.filter(e => e.day === day)
}

export default function CalendarCard() {
  return (
    <div className="bg-white rounded-card shadow-card p-6 xl:h-full flex flex-col">
      <h3 className="text-brand-orange text-xl font-bold mb-4">June 2022</h3>

      <table className="w-full xl:flex-1">
        <thead>
          <tr>
            {DAYS.map(d => (
              <th key={d} className="text-center text-[12px] font-semibold text-[#888] pb-2">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((cell, ci) => {
                const matched = getDots(cell.d, !!cell.other)
                const isToday = cell.d === 5 && !cell.other
                return (
                  <td key={ci} className="text-center py-1.5 px-0.5">
                    <span className={`text-[13px] ${cell.other ? 'text-[#CCC]' : ''} ${isToday ? 'text-brand-orange font-bold' : ''}`}>
                      {cell.d}
                    </span>
                    {matched.length > 0 && (
                      <div className="flex justify-center gap-0.5 mt-0.5">
                        {matched[0].types.map((type, ti) => (
                          <span
                            key={ti}
                            className={`inline-block w-1.5 h-1.5 rounded-full ${type === 'today' ? 'bg-brand-blue' : 'bg-brand-red'}`}
                          />
                        ))}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-3.5">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
            Today
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
            Meeting
          </div>
        </div>
        <Link to="/attendance" className="text-[13px] text-[#888] hover:text-brand-orange transition-colors">View more</Link>
      </div>
    </div>
  )
}
