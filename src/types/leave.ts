export type LeaveType =
  | 'Vacation Leave'
  | 'Sick Leave'
  | 'Emergency Leave'
  | 'Maternity Leave'
  | 'Paternity Leave'

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected'

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: LeaveStatus
  appliedDate: string
}
