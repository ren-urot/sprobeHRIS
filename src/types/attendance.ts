export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Leave'

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  timeIn: string
  timeOut: string
  totalHours: string
  status: AttendanceStatus
}
