export type ProbationaryStatus =
  | 'just-started'
  | '2nd-month'
  | '3rd-month-eval'
  | '4th-month'
  | '5th-month'
  | '6th-month-eval'

export const PROBATIONARY_STATUS_LABELS: Record<ProbationaryStatus, string> = {
  'just-started':    'Just started',
  '2nd-month':       '2nd Month',
  '3rd-month-eval':  'For 3rd Month Evaluation',
  '4th-month':       '4th Month',
  '5th-month':       '5th Month',
  '6th-month-eval':  'For 6th month evaluation',
}

export const PROBATIONARY_STATUS_COLORS: Record<ProbationaryStatus, string> = {
  'just-started':    '#9C27B0',
  '2nd-month':       '#FFC107',
  '3rd-month-eval':  '#1565C0',
  '4th-month':       '#B71C1C',
  '5th-month':       '#FF5700',
  '6th-month-eval':  '#4CAF50',
}

export interface ProbationaryEntry {
  id: string
  fullName: string
  email: string
  status: ProbationaryStatus
}

export interface CalendarEvent {
  day: number
  types: ('today' | 'meeting')[]
}
